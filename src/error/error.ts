export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', options?: ErrorOptions) {
    super(message, 404, options);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', options?: ErrorOptions) {
    super(message, 401, options);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', options?: ErrorOptions) {
    super(message, 403, options);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', options?: ErrorOptions) {
    super(message, 409, options);
  }
}

export class ValidationError extends AppError {
  constructor(
    message = 'Validation error',
    public fields?: { path: string; message: string }[],
    options?: ErrorOptions,
  ) {
    super(message, 422, options);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', options?: ErrorOptions) {
    super(message, 500, options);
  }
}
