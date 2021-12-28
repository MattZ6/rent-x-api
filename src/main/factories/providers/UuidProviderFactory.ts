import { UuidProvider } from '@infra/providers/uuid/UuidProvider';

export function makeUuidProvider() {
  return new UuidProvider();
}
