import { IHttpRequest, IHttpResponse } from './Http';

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
