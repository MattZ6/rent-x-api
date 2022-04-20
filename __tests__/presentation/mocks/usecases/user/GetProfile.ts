import { IGetUserProfileUseCase } from '@domain/usecases/user/GetProfile';

import { makeUserMock } from '../../../../domain';

export function makeGetUserProfileUseCaseOutputMock(): IGetUserProfileUseCase.Output {
  return makeUserMock();
}

export class GetUserProfileUseCaseSpy implements IGetUserProfileUseCase {
  async execute(
    _: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output> {
    return makeGetUserProfileUseCaseOutputMock();
  }
}
