// middleware para padronizar os erros
const { error } = require("../utils/response");

function errorMiddleware(err, req, res, next) {
  return res.status(400).json(error(err.message));
}

module.exports = errorMiddleware;
