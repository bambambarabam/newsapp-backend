const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const InternalServerError = require('../errors/internal-server-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  NOT_FOUND,
  ARTICLE_DELETED,
  VALID_ERR,
  INTERNAL_SERVER_ERR,
  OWNER_ERR,
} = require('../constants');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .catch((err) => {
      next(new ValidationError({
        message: `${VALID_ERR}: ${err.message}`,
      }));
    })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(new InternalServerError({ message: `${INTERNAL_SERVER_ERR} ${err.message}` }));
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params._id;
  Article.findById(id)
    .orFail()
    .catch(() => {
      next(new NotFoundError({ message: `${NOT_FOUND}` }));
    })
    .then((article) => {
      if (article.owner.toString() !== owner) {
        throw new ForbiddenError({ message: OWNER_ERR });
      }
      Article.findByIdAndDelete(id)
        .then(() => {
          res.send({ message: `${ARTICLE_DELETED}` });
        })
        .catch(next);
    })
    .catch(next);
};
