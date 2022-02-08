import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

import { userMock } from '../../../../domain/models/user.mock';

export class GetUserProfileUseCaseSpy implements IGetUserProfileUseCase {
  async execute(
    _: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output> {
    return userMock;
  }
}
