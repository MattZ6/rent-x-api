import { hash } from 'bcryptjs';
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
    const { name, email, password, driver_license } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new Error('User already with this email');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
