import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdatePassword';

import { makeUserMock } from '../../../../domain';

export function makeUpdateUserPasswordUseCaseOutputMock(): IUpdateUserPasswordUseCase.Output {
  return makeUserMock();
}

export class UpdateUserPasswordUseCaseSpy
  implements IUpdateUserPasswordUseCase
{
  async execute(
    _: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    return makeUpdateUserPasswordUseCaseOutputMock();
  }
}
