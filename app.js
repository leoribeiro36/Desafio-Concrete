var express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const corsRouter = require('./routes/cors')

var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsRouter)

routes(app)

module.exports = app;
