import { IUser } from '@domain/models/User';

interface ICreateUserUseCase {
  execute(data: ICreateUserUseCase.Input): Promise<ICreateUserUseCase.Output>;
}

namespace ICreateUserUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
    driver_license: string;
  };

  export type Output = IUser;
}

export { ICreateUserUseCase };
