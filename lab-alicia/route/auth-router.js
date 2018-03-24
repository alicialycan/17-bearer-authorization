'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user.js');
const router = express.Router();

router.route('/signup')

  .get((req, res) => {
    User.find()
      .then(user => res.status(200).json(user))
      .catch(err => res.sendStatus(400).send(err));
  })

  .post((req, res) => {
    new User(req.body)
      .save()
      .then(users => {
        console.log('user', users);
        res.status(200).json(users);
      })
      .catch(err => res.status(400).send(err.message));
  });

router.route('/signin')

  .get((req, res) => {
    let authHeader = req.get('Authorization');
    console.log('header:', authHeader);
    if (!authHeader) {
      res.status(401);
      res.send('Please provide a username and password');
      return;
    }
    let payload = authHeader.split('Basic')[1];
    let decoded = Buffer.from(payload, 'base64').toString();
    let [username, password] = decoded.split(':');
    console.log('username and password info:', username, password);
    let hash;

    User.findOne({ username: username })
      .then(user => {
        hash = user.password;
        console.log(user, 'hash', hash);
        let valid = bcrypt.compareSync(password, hash);
        if (valid) {
          res.send('Authorized');
        } else {
          res.status(401).send('Unauthorized');
        // if (user === null) {
        //   res.send('User not found');
        // }
        // if (hash === password) {
        //   res.send('You are now logged in');
        // } else {
        //   res.status(401).send('Unauthorized');
        }
      })
      .catch(err => res.send(err.message));
  });

module.exports = router;
