import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication';

import { makeJWTCryptographyProvider } from '../providers/JWTCryptographyProviderFactory';

export function makeAuthenticationMiddleware() {
  const cryptographyProvider = makeJWTCryptographyProvider();

  return new AuthenticationMiddleware(cryptographyProvider);
}
