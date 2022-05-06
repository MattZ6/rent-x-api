import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { internalServerError } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/protocols';

export class MiddlewareErrorHandlerDecorator implements IMiddleware {
  constructor(
    private readonly middleware: IMiddleware,
    private readonly saveErrorRepository: ISaveErrorRepository
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.middleware.handle(request);

      return response;
    } catch (err) {
      const error = err as Error;

      this.saveErrorRepository
        .save({
          stack: error.stack ?? 'NO STACK PROVIDED',
          thrown_at: this.middleware.constructor.name,
          resource_uri: request.original_url,
          http_method: request.method,
        })
        .then(() => console.log('👍 Error successfully registered'))
        .catch(() => console.log('❗ Fail to register the error'));

      return internalServerError(error);
    }
  }
}
