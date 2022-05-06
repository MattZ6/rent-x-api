import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { makeErrorEntityMock } from '../../../../domain';

export class SaveErrorRepositorySpy implements ISaveErrorRepository {
  async save(
    _: ISaveErrorRepository.Input
  ): Promise<ISaveErrorRepository.Output> {
    return makeErrorEntityMock();
  }
}
