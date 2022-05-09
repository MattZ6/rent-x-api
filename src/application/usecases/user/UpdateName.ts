import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateName';

import {
  ICheckIfUserExistsByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

export class UpdateUserNameUseCase implements IUpdateUserNameUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserNameUseCase.Input
  ): Promise<IUpdateUserNameUseCase.Output> {
    const { id, name } = data;

    const exists = await this.checkIfUserExistsByIdRepository.checkIfExistsById(
      {
        id,
      }
    );

    if (!exists) {
      throw new UserNotFoundWithProvidedIdError();
    }

    const user = await this.updateUserRepository.update({
      id,
      name,
    });

    return user;
  }
}
