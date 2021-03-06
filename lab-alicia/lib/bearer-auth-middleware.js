'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

let addToken = function(req, res, next) {
  let authHeader = req.headers.authorization;
  let token = authHeader.split('Bearer ')[1];
  console.log('token', token);

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log('decoded', decoded);
    if (err) {
      res.send('bad token');
      return;
    }
  
    User.findOne({ _id: decoded.userId })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
};

module.exports = addToken;
