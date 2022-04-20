import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';
import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetPassword';

import { IGenerateHashProvider } from '@application/protocols/providers/cryptography';
import {
  IFindUserTokenByTokenRepository,
  IUpdateUserRepository,
  IDeleteUserTokenByIdRepository,
} from '@application/protocols/repositories/user';

export class ResetUserPasswordUseCase implements IResetUserPasswordUseCase {
  constructor(
    private readonly findUserTokenByToken: IFindUserTokenByTokenRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly updateUserRepository: IUpdateUserRepository,
    private readonly deleteUserTokenByIdRepository: IDeleteUserTokenByIdRepository
  ) {}

  async execute(
    data: IResetUserPasswordUseCase.Input
  ): Promise<IResetUserPasswordUseCase.Output> {
    const { token, new_password } = data;

    const userToken = await this.findUserTokenByToken.findByToken({
      token,
    });

    if (!userToken) {
      throw new UserTokenNotFoundWithProvidedTokenError();
    }

    const hasExpired = Date.now() > userToken.expires_in.getTime();

    if (hasExpired) {
      throw new UserTokenExpiredError();
    }

    const newPasswordHash = await this.generateHashProvider.hash({
      value: new_password,
    });

    await this.updateUserRepository.update({
      id: userToken.user_id,
      password_hash: newPasswordHash,
    });

    await this.deleteUserTokenByIdRepository.deleteById({ id: userToken.id });
  }
}
