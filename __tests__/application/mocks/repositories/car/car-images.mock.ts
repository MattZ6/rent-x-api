import { ICreateCarImageRepository } from '@application/protocols/repositories/car';

import { makeCarImageMock } from '../../../../domain';

export class CreateCarImageRepositorySpy implements ICreateCarImageRepository {
  async create(
    _: ICreateCarImageRepository.Input
  ): Promise<ICreateCarImageRepository.Output> {
    return makeCarImageMock();
  }
}
