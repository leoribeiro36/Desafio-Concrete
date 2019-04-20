function returnMessage(res, status, message) {
    return res.status(status).send({
        mensagem: message
    });
}

function checkEmpty(res, element, name) {
    try {
        if (element == undefined || element == "") {
            return {
                status: 400,
                mensagem: `O campo ${name} está vazio`
            };
        }
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
}

function checkHeadersToken(req) {
    try {
        if (req.headers.token == undefined || req.headers.token == "") {
            throw {
                status: 401,
                message: `Não autorizado`
            };
        }
    } catch (error) {
        return res.status(400).send({
            mensagem: 'Erro inesperado'
        });
    }
}

module.exports = {
    returnMessage,
    checkEmpty,
    checkHeadersToken
};