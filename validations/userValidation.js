const util = require('./util');

const findUser = async (req, res, next) => {
    try {
        var check = util.checkHeadersToken(req);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
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