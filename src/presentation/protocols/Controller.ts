import { IHttpRequest, IHttpRespose } from './Http';

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpRespose>;
}
