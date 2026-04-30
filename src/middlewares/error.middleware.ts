import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
  kind?: string;
}

/**
 * Global error middleware — must have 4 parameters.
 * Express identifies it as error-handling middleware by the (err, req, res, next) signature.
 * All errors forwarded via next(err) or thrown in asyncHandler land here.
 */
export const errorMiddleware = (err: MongoError, req: Request, res: Response, _next: NextFunction): void => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl} — ${err.message}`);

  // Mongoose schema validation (missing required fields, type mismatch)
  if (err.name === 'ValidationError') {
    const messages = Object.values((err as unknown as { errors: Record<string, { message: string }> }).errors)
      .map(e => e.message);
    return sendError(res, 'Validation failed', 400, messages);
  }

  // MongoDB duplicate key — error code 11000 is the standard MongoDB duplicate index violation code
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field';
    return sendError(res, `Duplicate value: '${field}' already exists`, 409);
  }

  // Mongoose CastError — invalid ObjectId in route params (e.g. /students/not-an-id)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return sendError(res, 'Invalid ID format — must be a valid MongoDB ObjectId', 400);
  }

  // Named business logic errors thrown in use-cases
  const notFoundErrors = ['Student not found', 'Marks not found', 'Marks not found for this student'];
  if (notFoundErrors.includes(err.message)) return sendError(res, err.message, 404);

  if (err.message.includes('already exists') || err.message.includes('already taken')) {
    return sendError(res, err.message, 409);
  }

  sendError(res, 'Internal server error', 500);
};
