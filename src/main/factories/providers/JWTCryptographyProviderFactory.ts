import { JWTCryptographyProvider } from '@infra/providers/cryptography/cryptography/JWTCryptographyProvider';

import { authConfig } from '@main/config/environment/auth';

export function makeJWTCryptographyProvider() {
  return new JWTCryptographyProvider(
    authConfig.ACCESS_TOKEN_SECRET,
    authConfig.ACCESS_TOKEN_EXPIRES_IN_SECONDS
  );
}
