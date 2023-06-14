function onError(err, _req, res, _next) {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Internal Error';

  res.status(statusCode).send(message);
}

module.exports = onError;
