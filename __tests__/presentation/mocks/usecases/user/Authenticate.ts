import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate';

import { makeAuthenticationMock } from '../../../../domain';

export function makeAuthenticateUserUseCaseOutputMock(): IAuthenticateUserUseCase.Output {
  return makeAuthenticationMock();
}

export class AuthenticateUserUseCaseSpy implements IAuthenticateUserUseCase {
  async execute(
    _: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output> {
    return makeAuthenticateUserUseCaseOutputMock();
  }
}
