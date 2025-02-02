module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof require('../utils/appError')) {
      return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
};