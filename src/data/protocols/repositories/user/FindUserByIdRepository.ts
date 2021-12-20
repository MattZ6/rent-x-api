import { IUser } from '@domain/models/User';

export interface IFindUserByIdRepository {
  findById(id: string): Promise<IUser | undefined>;
}
