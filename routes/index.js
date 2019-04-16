var loginRouter = require('./login');
var statesRouter = require('./states');

module.exports = (app) => {
  app.use(loginRouter)
  app.use(statesRouter)
}
