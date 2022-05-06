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
    try {
      const { role } = request.user ?? {};

      if (role !== 'ADMIN') {
        throw new PermissionDeniedError();
      }

      return noContent();
    } catch (error) {
      if (error instanceof PermissionDeniedError) {
        return forbidden(error);
      }

      throw error;
    }
  }
}

namespace AdminMiddleware {
  export type Request = IHttpRequest<unknown, unknown, unknown, unknown>;

  export type Response = IHttpResponse;
}

export { AdminMiddleware };
