import { JWTCryptographyProvider } from '@infra/providers/cryptography/cryptography/JWTCryptographyProvider';

import { authConfig } from '@main/config/environment/auth';

export function makeJWTCryptographyProvider() {
  return new JWTCryptographyProvider(
    authConfig.AUTH_SECRET,
    authConfig.AUTH_EXPIRES_IN_IN_SECONDS
  );
}
