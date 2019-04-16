var express = require('express');
var loginRouter = require('./login');

const routes = (app) => {
  app.use('/login', loginRouter);
}

module.exports = (app) => {
  routes(app)
}
