'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./route/auth-router.js');
const websiteRouter = require('./route/website-router.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', authRouter);
app.use('/api', websiteRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
