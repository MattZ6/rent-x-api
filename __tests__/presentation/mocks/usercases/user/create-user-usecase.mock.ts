import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { userMock } from '../../../../domain/models/user.mock';

export class CreateUserUseCaseSpy implements ICreateUserUseCase {
  async execute(
    _: ICreateUserUseCase.Input
  ): Promise<ICreateUserUseCase.Output> {
    return userMock;
  }
}
