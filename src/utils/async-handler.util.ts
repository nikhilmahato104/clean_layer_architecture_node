import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Wraps async route handlers — forwards rejected promises to Express error middleware.
 * Without this, unhandled rejections in async functions bypass next(err) entirely.
 */
const asyncHandler = (fn: AsyncFn): RequestHandler =>
  (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next); };

export default asyncHandler;
