const jwt = require('jsonwebtoken');

// Essa secret seria uma variável de ambiente, mas para o teste em questao estou deixando chumbado
const MY_ENV_SECRET = 'secret';

async function authorized(req, _res, next) {
  try {
    const response = await new Promise((resolve, reject) => {
      jwt.verify(req.headers.authorization, MY_ENV_SECRET, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
    req.session = { role: response.role };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorized;
