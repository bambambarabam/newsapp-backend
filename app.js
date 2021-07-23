const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const limiter = require('./limiter');
const errHandler = require('./middlewares/errHandler');

const { PORT, SERVER_DB } = require('./config');

const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors());
app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(SERVER_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errHandler);

app.listen(PORT);
