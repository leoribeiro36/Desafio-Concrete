const util = require('./util');

const findUser = async (req, res, next) => {
    try {
        util.checkHeadersToken(req);
        next();
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

module.exports = {
    findUser
};