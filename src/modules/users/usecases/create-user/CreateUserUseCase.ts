import { inject, injectable } from 'tsyringe';

import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const { name, username, email, password, driver_license } = data;

    await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
  }
}
