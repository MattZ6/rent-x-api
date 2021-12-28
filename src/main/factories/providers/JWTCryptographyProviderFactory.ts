import { JWTCryptographyProvider } from '@infra/providers/cryptography/cryptography/JWTCryptographyProvider';

export function makeJWTCryptographyProvider() {
  const jwtExpiresInSeconds = 15 * 60; // 👈 15 minutes

  return new JWTCryptographyProvider(
    '2b246fb4a2e07344cebe1e7d3150e4e0',
    jwtExpiresInSeconds
  );
}
