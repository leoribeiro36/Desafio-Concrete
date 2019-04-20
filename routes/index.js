var loginRouter = require('./login');
var userRouter = require('./user');
var statesRouter = require('./states');

module.exports = (app) => {
  app.use(loginRouter);
  app.use(userRouter);
  app.use(statesRouter);
};
