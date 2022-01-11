import {
  TokenExpiredError,
  UserNotFoundWithThisIdError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';
import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetUserPassword';

import { IGenerateHashProvider } from '@data/protocols/providers/cryptography/hash';
import {
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';
import {
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@data/protocols/repositories/user-token';

export class ResetUserPasswordUseCase implements IResetUserPasswordUseCase {
  constructor(
    private readonly findUserTokenByToken: IFindUserTokenByTokenRepository,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly updateUserRepository: IUpdateUserRepository,
    private readonly deleteUserTokenByIdRepository: IDeleteUserTokenByIdRepository
  ) {}

  async execute(
    data: IResetUserPasswordUseCase.Input
  ): Promise<IResetUserPasswordUseCase.Output> {
    const { token, new_password } = data;

    const userToken = await this.findUserTokenByToken.findByToken({ token });

    if (!userToken) {
      throw new UserTokenNotFoundWithThisTokenError();
    }

    const hasExpired = Date.now() > userToken.expires_in.getTime();

    if (hasExpired) {
      throw new TokenExpiredError();
    }

    const user = await this.findUserByIdRepository.findById(userToken.user_id);

    if (!user) {
      throw new UserNotFoundWithThisIdError();
    }

    user.password_hash = await this.generateHashProvider.hash(new_password);

    await this.updateUserRepository.update(user);

    await this.deleteUserTokenByIdRepository.deleteById({ id: userToken.id });
  }
}
