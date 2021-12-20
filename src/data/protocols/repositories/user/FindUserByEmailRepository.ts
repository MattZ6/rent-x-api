import { IUser } from '@domain/models/User';

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
}
