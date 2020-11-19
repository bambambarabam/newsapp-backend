require('dotenv').config();

const {
  NODE_ENV,
  SERVER_HOST,
} = process.env;

const SERVER_DB = NODE_ENV === 'production' && SERVER_HOST ? SERVER_HOST : 'mongodb://localhost:27017/newsappdb';

module.exports = {
  PORT: 3000,
  SERVER_DB,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};
