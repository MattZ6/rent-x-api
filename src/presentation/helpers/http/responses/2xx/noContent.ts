import { IHttpResponse } from '@presentation/protocols';

export function noContent(): IHttpResponse<void> {
  return {
    statusCode: 204,
  };
}
