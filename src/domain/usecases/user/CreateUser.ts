import { AppError } from '@domain/errors';
import { IUser } from '@domain/models/User';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
};

export type CreateUserResponse = IUser | AppError;

export interface ICreateUserUseCase {
  execute(data: CreateUserDTO): Promise<CreateUserResponse>;
}
