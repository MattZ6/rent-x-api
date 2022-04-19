import { UserRole } from '@domain/entities/User';
import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate';

import {
  ICompareHashProvider,
  IEncryptProvider,
} from '@application/protocols/providers/cryptography';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  IFindUserByEmailRepository,
  ICreateUserTokenRepository,
} from '@application/protocols/repositories/user';

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly encryptProvider: IEncryptProvider<{ role: UserRole }>,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createUserTokenRepository: ICreateUserTokenRepository
  ) {}

  async execute(
    data: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output> {
    const { email, password } = data;

    const user = await this.findUserByEmailRepository.findByEmail({ email });

    if (!user) {
      throw new UserNotFoundWithProvidedEmailError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: password,
      hashed_value: user.password_hash,
    });

    if (!passwordsMatch) {
      throw new WrongPasswordError();
    }

    const accessToken = await this.encryptProvider.encrypt({
      subject: user.id,
      payload: { role: user.role },
    });

    const refreshToken = await this.generateUuidProvider.generate();

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const userToken = await this.createUserTokenRepository.create({
      user_id: user.id,
      token: refreshToken,
      expires_in: expiresDate,
    });

    return {
      access_token: accessToken,
      refresh_token: userToken.token,
    };
  }
}
