import { getRepository, Repository } from 'typeorm';

import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

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

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }
}
