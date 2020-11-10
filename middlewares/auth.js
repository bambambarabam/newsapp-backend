const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UNAUTHORIZED_ERR } = require('../constants');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError({ message: UNAUTHORIZED_ERR });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError({ message: UNAUTHORIZED_ERR });
  }
  req.user = payload;
  next();
};
