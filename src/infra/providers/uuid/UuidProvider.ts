import { v4 } from 'uuid';

import { IGenerateUuidProvider } from '@data/protocols/providers/uuid';

export class UuidProvider implements IGenerateUuidProvider {
  async generate(): Promise<string> {
    return v4();
  }
}
