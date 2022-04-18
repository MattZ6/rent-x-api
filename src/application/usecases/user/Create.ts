import {
  UserAlreadyExistsWithProvidedDriverLicenseError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/Create';

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
      throw new UserAlreadyExistsWithProvidedEmailError();
    }

    const alreadyExistsWithProvidedDriverLicense =
      await this.checkIfUserExistsByDriverLicenseRepository.checkIfExistsByDriverLicense(
        { driver_license }
      );

    if (alreadyExistsWithProvidedDriverLicense) {
      throw new UserAlreadyExistsWithProvidedDriverLicenseError();
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
