const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { CELEBRATE_ERR } = require('../constants');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError({ message: CELEBRATE_ERR });
  }
  return value;
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(urlValidation).required(),
    image: Joi.string().custom(urlValidation).required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).regex(/^[A-Za-z0-9#?!@$%^&*-]/),
    name: Joi.string().regex(/^[a-zA-Zа-яА-Я]/).min(2).max(30),
  }),
});

module.exports = {
  validateUser,
  validateId,
  validateArticle,
};
