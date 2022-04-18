import { faker } from '@faker-js/faker';

import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate';

export class AuthenticateUserUseCaseSpy implements IAuthenticateUserUseCase {
  async execute(
    _: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output> {
    return {
      access_token: faker.datatype.string(),
      refresh_token: faker.datatype.string(),
    };
  }
}
