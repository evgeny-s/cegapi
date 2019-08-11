const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

require('dotenv').config();

const cors = require('./server/middlewares/cors');
const logInternalError = require('./server/middlewares/logInternalError');
const routing = require('./server/routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cors());
routing(app);
app.use(logInternalError());

module.exports = app;
