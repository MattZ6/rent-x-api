import { BcryptjsHashProvider } from '@infra/providers/cryptography/hash/BcryptjsHashProvider';

import { authConfig } from '@main/config/environment/auth';

export function makeBcryptjsHashProvider() {
  return new BcryptjsHashProvider(authConfig.HASH_SALT);
}
