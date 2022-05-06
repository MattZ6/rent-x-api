import { randomUUID } from 'node:crypto';

import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';

export class UuidProvider implements IGenerateUuidProvider {
  async generate(): Promise<IGenerateUuidProvider.Output> {
    return randomUUID();
  }
}
