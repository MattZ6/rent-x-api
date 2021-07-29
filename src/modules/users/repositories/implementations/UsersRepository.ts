import { getRepository, Repository } from 'typeorm';

import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUserRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: CreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = data;

    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }
}
