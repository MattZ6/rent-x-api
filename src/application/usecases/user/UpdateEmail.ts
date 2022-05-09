import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateEmail';

import { IUpdateUserRepository } from '@application/protocols/repositories/user';
import { ICheckIfUserExistsByEmailWithDifferentIdRepository } from '@application/protocols/repositories/user/CheckIfExistsByEmailWithDifferentId';

export class UpdateUserEmailUseCase implements IUpdateUserEmailUseCase {
  constructor(
    private readonly checkIfUserExistsByEmailWithDifferentIdRepository: ICheckIfUserExistsByEmailWithDifferentIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserEmailUseCase.Input
  ): Promise<IUpdateUserEmailUseCase.Output> {
    const { id, email } = data;

    const alreadyExists =
      await this.checkIfUserExistsByEmailWithDifferentIdRepository.checkIfExistsByEmailWithDifferentId(
        {
          id,
          email,
        }
      );

    if (alreadyExists) {
      throw new UserAlreadyExistsWithProvidedEmailError();
    }

    const user = await this.updateUserRepository.update({
      id,
      email,
    });

    return user;
  }
}
