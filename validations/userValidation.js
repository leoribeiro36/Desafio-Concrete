const util = require('./util');

const findUser = async (req, res, next) => {
    util.checkHeadersToken(req);
    next();
};

module.exports = {
    findUser
};