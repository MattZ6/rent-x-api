import { AppError } from '@domain/errors';
import { IUser } from '@domain/models/User';

export interface ICreateUserUseCase {
  execute(data: ICreateUserUseCase.Data): Promise<ICreateUserUseCase.Response>;
}

export namespace ICreateUserUseCase {
  export type Data = {
    name: string;
    email: string;
    password: string;
    driver_license: string;
  };

  export type Response = IUser | AppError;
}
