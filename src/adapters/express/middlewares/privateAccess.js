const { Unauthorized } = require('../../../infra/utils/exceptions');

const FULL_ACCESS_ROLES = ['admin', 'manager'];

async function privateAccess(req, _res, next) {
  if (!FULL_ACCESS_ROLES.includes(req.session.role)) {
    next(new Unauthorized());
  }
  next();
}

module.exports = privateAccess;
