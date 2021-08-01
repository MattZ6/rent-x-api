import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>;
  update(data: User): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
