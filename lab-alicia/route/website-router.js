'use strict';

const express = require('express');
const Website = require('../model/website.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const websiteRouter = express.Router();

websiteRouter.route('/websites')

  .get(bearerAuth, (req, res) => {
    console.log('UserId:', req.user);
    Website.find({userId: req.user})
      .then(websites => res.status(200).json(websites))
      .catch(err => res.sendStatus(404).send(err));
  })

  .post(bearerAuth, (req, res) => {
    req.body.userId = req.user._id;
    new Website(req.body)
      .save()
      .then(website => {
        console.log('website', website);
        res.status(200).json(website);
      })
      .catch(err => res.status(404).send(err.message));
  });

websiteRouter.route('/website/:id')

  .get(bearerAuth, (req, res) => {
    if (req.params.id) {
      return Website.findById(req.params.id)
        .then((website) => res.status(200).json(website))
        .catch(err => res.status(404).send(err.message));
    }
  })

  .put(bearerAuth, (req, res) => {
    let id = req.params.id;
    Website.findByIdAndUpdate(id, req.body, {
      new: true
    })
      .then(website => res.status(204).json(website))
      .catch(err => res.status(400).send(err.message));
  })

  .delete(bearerAuth, (req, res) => {
    Website.findByIdAndRemove(req.params.id)
      .then(website => {
        if (website.userId.toString() === req.user.id.toString()) {
          return website.remove();
        }
      })
      .then(() => res.status(200))
      .catch(err => res.status(500).send(err.message));
  });

module.exports = websiteRouter;
