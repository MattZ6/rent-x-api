import { IUser } from '@domain/models/User';

export type CreateUserRepositoryData = {
  name: string;
  email: string;
  password_hash: string;
  driver_license: string;
};

export interface ICreateUserRepository {
  create(data: CreateUserRepositoryData): Promise<IUser>;
}
