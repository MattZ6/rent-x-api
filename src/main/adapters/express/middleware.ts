import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from '@presentation/protocols';

export function adaptMiddleware(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { statusCode, body } = await middleware.handle({
      body: request?.body ?? {},
      query: request?.query ?? {},
      params: request?.params ?? {},
      headers: request?.headers ?? {},
      original_url: request.originalUrl,
      method: request.method,
    });

    const isSuccessful = statusCode >= 200 && statusCode <= 299;

    if (isSuccessful) {
      Object.assign(request, body);

      return next();
    }

    return response.status(statusCode).json(body);
  };
}
