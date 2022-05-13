import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdatePassword';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@application/protocols/providers/cryptography';
import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

export class UpdateUserPasswordUseCase implements IUpdateUserPasswordUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    const { id, new_password, old_password } = data;

    const user = await this.findUserByIdRepository.findById({ id });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: old_password,
      hashed_value: user.password_hash,
    });

    if (!passwordsMatch) {
      throw new WrongPasswordError();
    }

    const newPasswordHash = await this.generateHashProvider.hash({
      value: new_password,
    });

    const updatedUser = await this.updateUserRepository.update({
      id,
      password_hash: newPasswordHash,
    });

    return updatedUser;
  }
}
