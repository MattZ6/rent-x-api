import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { User } from '@modules/users/entities/User';

import { IUsersRepository } from '../IUserRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: CreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = data;

    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
      created_at: new Date(),
      updated_at: new Date(),
    } as User);

    this.users.push(user);
  }

  async update(data: User): Promise<void> {
    this.users = this.users.map(user =>
      user.id === data.id
        ? {
            ...user,
            ...data,
            updated_at: new Date(),
          }
        : user
    );
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
}
