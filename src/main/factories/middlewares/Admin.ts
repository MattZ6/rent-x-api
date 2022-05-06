import { AdminMiddleware } from '@presentation/middlewares/Admin';

import { makeMiddlewareErrorHandlerDecorator } from '../decorators/MiddlewareErrorHandler';

export function makeAdminMiddleware() {
  const middleware = new AdminMiddleware();

  return makeMiddlewareErrorHandlerDecorator(middleware);
}
