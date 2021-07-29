import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>;
}
