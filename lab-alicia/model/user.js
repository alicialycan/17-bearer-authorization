'use strict';

// const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const createError = require('http-errors');
// const Promise = require('bluebird');

mongoose.connect(process.env.MONGODB_URI);

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

// userSchema.pre('save', next => {
//   if (this.isNew) {
//     bcrypt.hash(this.password, 10, (err, hash) => {
//       if (err) return next(err);

//       this.password = hash;
//       this.passwordHash = hash;
//       next();
//     });
//   }
// });

// userSchema.checkPassword = (attempt) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(attempt, this.password, (err, valid) => {
//             if (err) {
//                 reject(err)
//             }
//             resolve(valid)
//         })
//     })
// };

module.exports = User;
