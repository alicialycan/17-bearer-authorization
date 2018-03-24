'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/user');

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

userSchema.pre('save', function(next) {
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

userSchema.checkPassword = function(attempt) {
  let user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(attempt, user.password, (err, valid) => {
      if (err) {
        reject(err);
      }
      resolve(valid);
    });
  });
};

module.exports = User;
