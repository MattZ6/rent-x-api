import { PermissionDeniedError } from '@presentation/errors';
import { forbidden, noContent } from '@presentation/helpers/http';
import {
  IMiddleware,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class AdminMiddleware implements IMiddleware {
  async handle(
    request: AdminMiddleware.Request
  ): Promise<AdminMiddleware.Response> {
    const { role } = request.user ?? {};

    if (role !== 'ADMIN') {
      return forbidden(new PermissionDeniedError());
    }

    return noContent();
  }
}

namespace AdminMiddleware {
  export type Request = IHttpRequest<unknown, unknown, unknown, unknown>;

  export type Response = IHttpResponse;
}

export { AdminMiddleware };
