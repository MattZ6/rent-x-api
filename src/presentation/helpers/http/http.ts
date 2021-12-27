import { IHttpResponse } from '@presentation/protocols';

export function ok<T = any>(data: T): IHttpResponse<T> {
  return {
    statusCode: 200,
    body: data,
  };
}

export function created<T = any>(data?: T): IHttpResponse<T> {
  return {
    statusCode: 201,
    body: data,
  };
}

export function noContent(): IHttpResponse<void> {
  return {
    statusCode: 204,
  };
}

export function notFound(error: Error): IHttpResponse<Error> {
  return {
    statusCode: 404,
    body: error,
  };
}

export function conflict(error: Error): IHttpResponse<Error> {
  return {
    statusCode: 409,
    body: error,
  };
}

export function unprocessableEntity(error: Error): IHttpResponse<Error> {
  return {
    statusCode: 422,
    body: error,
  };
}

export function internalServerError(error: Error): IHttpResponse<Error> {
  return {
    statusCode: 500,
    body: error,
  };
}
