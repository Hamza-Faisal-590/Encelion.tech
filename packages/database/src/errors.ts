// ─────────────────────────────────────────────────────────────────────────────
// Domain-specific error types for the database package
// ─────────────────────────────────────────────────────────────────────────────

export class NotFoundException extends Error {
  public readonly statusCode = 404;

  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundException';
  }
}

export class ConflictException extends Error {
  public readonly statusCode = 409;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictException';
  }
}

export class ForbiddenException extends Error {
  public readonly statusCode = 403;

  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenException';
  }
}
