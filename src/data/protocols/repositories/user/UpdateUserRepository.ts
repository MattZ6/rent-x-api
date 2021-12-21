import { IUser } from '@domain/models/User';

export interface IUpdateUserRepository {
  update(data: IUser): Promise<IUser>;
}
