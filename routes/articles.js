const articlesRouter = require('express').Router();
const {
  createArticle,
  getArticles,
  deleteArticle,
} = require('../controllers/articles');
const { validateId, validateArticle } = require('../middlewares/reqValidation');

articlesRouter.get('/', getArticles);
articlesRouter.post('/', validateArticle, createArticle);
articlesRouter.delete('/:_id', validateId, deleteArticle);

module.exports = articlesRouter;
