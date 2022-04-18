import { IGetUserProfileUseCase } from '@domain/usecases/user/GetProfile';

import { userMock } from '../../../../domain/models';

export class GetUserProfileUseCaseSpy implements IGetUserProfileUseCase {
  async execute(
    _: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output> {
    return userMock;
  }
}
