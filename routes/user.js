const usersRouter = require('express').Router();
const { validateUser } = require('../middlewares/reqValidation');

const {
  getUser,
} = require('../controllers/user');

usersRouter.get('/me', validateUser, getUser);

module.exports = usersRouter;
