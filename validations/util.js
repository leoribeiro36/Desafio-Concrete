function checkEmpty(res, element, name) {
    if (element == undefined || element == "") {
        return res.status(400).send({
            mensagem: `O campo ${name} está vazio`
        });
    }
}

function checkHeadersToken(req) {
    if (req.headers.token == undefined || req.headers.token == "") {
        return res.status(401).send({
            mensagem: `Não autorizado`
        });
    }
}

module.exports = {
    checkEmpty,
    checkHeadersToken
};