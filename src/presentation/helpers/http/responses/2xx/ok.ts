import { IHttpResponse } from '@presentation/protocols';

export function ok<T = unknown>(data: T): IHttpResponse<T> {
  return {
    statusCode: 200,
    body: data,
  };
}
