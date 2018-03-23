'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./route/auth-router.js');

mongoose.connect('mongodb://localhost/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
