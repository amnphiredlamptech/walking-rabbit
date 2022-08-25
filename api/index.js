const express = require('express');

const app = express();
app.use(express.json());

const { user } = require('./routes');

app.use('/user', user);

module.exports = app;
