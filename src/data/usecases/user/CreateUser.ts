import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';
import {
  CreateUserDTO,
  CreateUserResponse,
  ICreateUserUseCase,
} from '@domain/usecases/user/CreateUser';

import { IGenerateHashProvider } from '@data/protocols/providers/cryptography/hash';
import {
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
} from '@data/protocols/repositories/user';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly checkIfUserExistsByEmailRepository: ICheckIfUserExistsByEmailRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
    const { name, email, driver_license, password } = data;

    const alreadyExists =
      await this.checkIfUserExistsByEmailRepository.checkIfExistsByEmail(email);

    if (alreadyExists) {
      return new UserAlreadyExistsWithThisEmailError();
    }

    const hashedPassword = await this.generateHashProvider.hash(password);

    return this.createUserRepository.create({
      name,
      email,
      driver_license,
      password_hash: hashedPassword,
    });
  }
}
