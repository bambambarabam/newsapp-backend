const { INTERNAL_SERVER_ERR } = require('../constants');

module.exports = ((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `${INTERNAL_SERVER_ERR}: ${err.message}` });
  next();
});
