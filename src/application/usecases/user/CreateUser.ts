import {
  UserAlreadyExistsWithThisDriverLicenseError,
  UserAlreadyExistsWithThisEmailError,
} from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { IGenerateHashProvider } from '@application/protocols/providers/cryptography/hash';
import {
  ICheckIfUserExistsByDriverLicenseRepository,
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
} from '@application/protocols/repositories/user';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly checkIfUserExistsByEmailRepository: ICheckIfUserExistsByEmailRepository,
    private readonly checkIfUserExistsByDriverLicenseRepository: ICheckIfUserExistsByDriverLicenseRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async execute(
    data: ICreateUserUseCase.Input
  ): Promise<ICreateUserUseCase.Output> {
    const { name, email, driver_license, password } = data;

    const alreadyExistsWithProvidedEmail =
      await this.checkIfUserExistsByEmailRepository.checkIfExistsByEmail({
        email,
      });

    if (alreadyExistsWithProvidedEmail) {
      throw new UserAlreadyExistsWithThisEmailError();
    }

    const alreadyExistsWithProvidedDriverLicense =
      await this.checkIfUserExistsByDriverLicenseRepository.checkIfExistsByDriverLicense(
        { driver_license }
      );

    if (alreadyExistsWithProvidedDriverLicense) {
      throw new UserAlreadyExistsWithThisDriverLicenseError();
    }

    const hashedPassword = await this.generateHashProvider.hash({
      value: password,
    });

    return this.createUserRepository.create({
      name,
      email,
      driver_license,
      password_hash: hashedPassword,
    });
  }
}
