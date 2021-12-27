import { BcryptjsHashProvider } from '@infra/providers/cryptography/hash/BcryptjsHashProvider';

export function makeBcryptjsHashProvider() {
  return new BcryptjsHashProvider(12);
}
