const allowedCors = [
  'https://newsapp.me',
  'http://newsapp.me',
  'localhost:3000',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  next();
});
