'use strict';

// const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const createError = require('http-errors');
// const Promise = require('bluebird');

// mongoose.connect(process.env.MONGODB_URI);

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

userSchema.pre('save', next => {
  let user = this;
  if (user.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      user.passwordHash = hash;
      next();
    });
  } else {
    console.log('user is not new');
    next();
  }
});

// userSchema.checkPassword = (attempt) => {
//   let user = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(attempt, user.password, (err, valid) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(valid);
//     });
//   });
// };

module.exports = User;
