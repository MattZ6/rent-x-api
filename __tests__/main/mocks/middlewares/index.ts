import { faker } from '@faker-js/faker';

import {
  IMiddleware,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

export function makeMiddlewareHttpRequestMock(): IHttpRequest {
  return {
    query: {},
    body: {},
    headers: {},
    params: {},
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
  };
}

export function makeMiddlewareHttpResponseMock(): IHttpResponse {
  return {
    statusCode: faker.internet.port(),
    body: {},
  };
}

export class MiddlewareSpy implements IMiddleware {
  async handle(_: IHttpRequest): Promise<IHttpResponse> {
    return makeMiddlewareHttpResponseMock();
  }
}
