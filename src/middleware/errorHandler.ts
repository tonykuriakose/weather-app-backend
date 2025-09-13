import { Request, Response, NextFunction } from 'express';
import { ErrorResponseDTO } from '../dto/WeatherDTO';

// Custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
export const globalErrorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Handle specific error types
  if (error.message.includes('not found')) {
    statusCode = 404;
    message = error.message;
  }

  if (error.message.includes('API key')) {
    statusCode = 500;
    message = 'Weather service configuration error';
  }

  // Log error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  const errorResponse: ErrorResponseDTO = {
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  };

  res.status(statusCode).json(errorResponse);
};

// Async error wrapper to catch async errors
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler for undefined routes
export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse: ErrorResponseDTO = {
    success: false,
    message: `Route ${req.originalUrl} not found`
  };
  res.status(404).json(errorResponse);
};