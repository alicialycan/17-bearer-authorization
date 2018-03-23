'use strict';
const express = require('express');
const User = require('../model/user.js');
const router = express.Router();

router.route('/signup')

  .get((req, res) => {
    User.find()
      .then(user => res.status(200).json(user))
      .catch(err => res.sendStatus(400).send(err));
  })

  .post((req, res) => {
    console.log('req and body', req.body);
    new User(req.body)
      .save()
      .then(users => {
        console.log('user', users);
        res.status(200).json(users);
      })
      .catch(err => res.send(err.message));
  });

// router.route('/signin')

// .get((req, res) => {
//     let authHeader = req.get('Authorization');
//     console.log('Auth header:', authHeader);
//     if (!authHeader) {
//         res.status(401);
//         res.send('Please provide a username and password');
//     }

//     let payload = authHeader.split('Basic')[1];
//     let decoded = Buffer.from(payload, 'base64').toString();
//     let [username, password] = decoded.split(':');

//     User.findOne({ username: username })
//         .then(user => {
//             console.log(user);
//             if (user === null) {
//                 res.send('User not found');
//             }
//             if (user.password === password) {
//                 res.send('You are now logged in');
//             } else {
//                 res.sendStatus(401).send('Invalid password');
//             }
//         })
//         .catch(err => res.sendStatus(400).send(err));
//         console.log('username and password info:', username, password);
// });

module.exports = router;
