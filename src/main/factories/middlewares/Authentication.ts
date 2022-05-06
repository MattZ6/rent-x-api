import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication';

import { makeMiddlewareErrorHandlerDecorator } from '../decorators/MiddlewareErrorHandler';
import { makeJWTCryptographyProvider } from '../providers/JWTCryptographyProviderFactory';

export function makeAuthenticationMiddleware() {
  const cryptographyProvider = makeJWTCryptographyProvider();

  const middleware = new AuthenticationMiddleware(cryptographyProvider);

  return makeMiddlewareErrorHandlerDecorator(middleware);
}
