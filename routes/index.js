const router = require('express').Router();
const auth = require('../middlewares/auth');
const articles = require('./articles');
const user = require('./user');
const { login, createUser } = require('../controllers/user');
const { validateUser } = require('../middlewares/reqValidation');
const NotFoundError = require('../errors/not-found-err');
const {
  NOT_FOUND,
} = require('../constants');

router.post('/signin', validateUser, login);
router.post('/signup', validateUser, createUser);

router.use('/users', auth, user);
router.use('/articles', auth, articles);

router.use((req, res, next) => {
  next(new NotFoundError({ message: NOT_FOUND }));
});

module.exports = router;
