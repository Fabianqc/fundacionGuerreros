import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | { message?: string } = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string | { message?: string };
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      // Sanitized database error specific to TypeORM
      message =
        'Database query failed due to invalid data constraint or syntax.';

      // Log the real query error internally but do not leak to client
      this.logger.error(
        `[TypeORM QueryFailedError] ${request.method} ${request.url} - ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'An unexpected error occurred.';

      // Log unhandled systemic errors
      this.logger.error(
        `[Unhandled Error] ${request.method} ${request.url} - ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.error(
        `[Unknown Exception] ${request.method} ${request.url}`,
        JSON.stringify(exception),
      );
    }

    // Standardized API error response payload
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof message === 'string'
          ? message
          : (message.message ?? JSON.stringify(message)),
    };

    response.status(status).json(errorResponse);
  }
}
