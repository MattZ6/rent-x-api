import {
  IncorrectPassword,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import {
  AuthenticateUserDTO,
  AuthenticateUserResponseDTO,
  IAuthenticateUserUseCase,
} from '@domain/usecases/user/AuthenticateUser';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography';
import { ICompareHashProvider } from '@data/protocols/providers/cryptography/hash';
import { IGenerateUuidProvider } from '@data/protocols/providers/uuid';
import { IFindUserByEmailRepository } from '@data/protocols/repositories/user';
import { ICreateUserTokenRepository } from '@data/protocols/repositories/user-token';

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly encryptProvider: IEncryptProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createUserTokenRepository: ICreateUserTokenRepository
  ) {}

  async execute(
    data: AuthenticateUserDTO
  ): Promise<AuthenticateUserResponseDTO> {
    const { email, password } = data;

    const user = await this.findUserByEmailRepository.findByEmail(email);

    if (!user) {
      return new UserNotFoundWithThisEmailError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: password,
      value_to_compare: user.password_hash,
    });

    if (!passwordsMatch) {
      return new IncorrectPassword();
    }

    const accessToken = await this.encryptProvider.encrypt({
      value: user.id,
    });

    const refreshToken = await this.generateUuidProvider.generate();

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    await this.createUserTokenRepository.create({
      user_id: user.id,
      token: refreshToken,
      expires_in: expiresDate,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
