import { ICreateUserUseCase } from '@domain/usecases/user/Create';

import { userMock } from '../../../../domain/entities';

export class CreateUserUseCaseSpy implements ICreateUserUseCase {
  async execute(
    _: ICreateUserUseCase.Input
  ): Promise<ICreateUserUseCase.Output> {
    return userMock;
  }
}
