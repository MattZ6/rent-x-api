import { v4 } from 'uuid';

import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';

export class UuidProvider implements IGenerateUuidProvider {
  async generate(): Promise<IGenerateUuidProvider.Output> {
    return v4();
  }
}
