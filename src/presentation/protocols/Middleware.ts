import { IHttpRequest, IHttpResponse } from './Http';

export interface IMiddleware {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
