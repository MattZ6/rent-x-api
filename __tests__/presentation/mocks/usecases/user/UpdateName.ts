import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateName';

import { makeUserMock } from '../../../../domain';

export function makeUpdateUserNameUseCaseOutputMock(): IUpdateUserNameUseCase.Output {
  return makeUserMock();
}

export class UpdateUserNameUseCaseSpy implements IUpdateUserNameUseCase {
  async execute(
    _: IUpdateUserNameUseCase.Input
  ): Promise<IUpdateUserNameUseCase.Output> {
    return makeUpdateUserNameUseCaseOutputMock();
  }
}
