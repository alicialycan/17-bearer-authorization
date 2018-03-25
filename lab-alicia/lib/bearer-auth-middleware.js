'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

let addToken = function(req, res, next) {
  let authHeader = req.headers.authorization;
  let token = authHeader.split('Bearer ')[1];

  //   if(!token) {
  //     res.status(401);
  //     res.send('no token was provided');
  //     return;
  //   }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    User.findOne({ username: decoded.username })
      .then(user => {
        if (!user) {
          res.send(err);
          return;
        }
        req.user = user
          .catch(err => res.send(err.message));
        next();
      });
  });
};

module.exports = addToken;
