const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const {
  CONFLICT_ERR,
  NOT_FOUND,
} = require('../constants');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError({ message: `${CONFLICT_ERR}` });
      } return next(err);
    })
    .then((user) => res.status(201).send({
      email: user.email, name: user.name,
    }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      next(new NotFoundError({ message: `${NOT_FOUND}` }));
    })
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({
          _id: user._id,
        }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
