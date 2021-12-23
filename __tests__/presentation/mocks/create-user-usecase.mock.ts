import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { userMock } from '../../domain/models/user.mock';

export class CreateUserUseCaseSpy implements ICreateUserUseCase {
  async execute(
    _: ICreateUserUseCase.Input
  ): Promise<ICreateUserUseCase.Output> {
    // const { name, email, driver_license } = data;

    // const user = { ...userMock };

    // Object.assign(user, { name, email, driver_license });

    // return user;
    return userMock;
  }
}
