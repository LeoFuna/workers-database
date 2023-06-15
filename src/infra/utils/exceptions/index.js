class NotFound extends Error {
  apiError = true;
  statusCode = 404;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotFound.prototype);

    this.name = `${NotFound.name}`;
    this.message = 'Not Found Error';
  }
}

class Unauthorized extends Error {
  apiError = true;
  statusCode = 401;

  constructor() {
    super();
    Object.setPrototypeOf(this, Unauthorized.prototype);

    this.name = `${Unauthorized.name}`;
    this.message = 'Not Authorized!';
  }
}

class NotImplemented extends Error {
  apiError = true;
  statusCode = 501;

  constructor() {
    super();
    Object.setPrototypeOf(this, NotImplemented.prototype);

    this.name = `${NotImplemented.name}`;
  }
}

class InvalidData extends Error {
  apiError = true;
  statusCode = 400;

  constructor(message) {
    super();
    Object.setPrototypeOf(this, InvalidData.prototype);

    this.name = `${InvalidData.name}`;
    this.message = message || super.message;
  }
}

module.exports = {
  NotFound,
  NotImplemented,
  InvalidData,
  Unauthorized,
};
