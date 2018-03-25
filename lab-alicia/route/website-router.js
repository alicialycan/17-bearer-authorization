'use strict';

const express = require('express');
const Website = require('../model/website.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const websiteRouter = express.Router();

websiteRouter.route('/websites', bearerAuth)

  .get((req, res) => {
    Website.find()
      .then(user => res.status(200).json(user))
      .catch(err => res.sendStatus(404).send(err));
  })

  .post((req, res) => {
    new Website(req.body)
      .save()
      .then(website => {
        console.log('website', website);
        res.status(200).json(website);
      })
      .catch(err => res.status(404).send(err.message));
  });

websiteRouter.route('/website/:id', bearerAuth)

  .get((req, res) => {
    if (req.params.id) {
      return Website.findById(req.params.id)
        .then((website) => res.status(200).json(website))
        .catch(err => res.status(404).send(err.message));
    }
  })

  .put((req, res) => {
    let id = req.params.id;
    Website.findByIdAndUpdate(id, req.body, {
      new: true
    })
      .then(website => res.status(204).json(website))
      .catch(err => res.status(400).send(err.message));
  })

  .delete((req, res) => {
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
