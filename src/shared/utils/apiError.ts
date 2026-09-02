export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true, // "operational" = expected error, not a bug
    public details?: { path: string; message: string }[],
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}
