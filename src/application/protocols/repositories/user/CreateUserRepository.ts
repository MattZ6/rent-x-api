import { IUser } from '@domain/entities/User';

interface ICreateUserRepository {
  create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output>;
}

namespace ICreateUserRepository {
  export type Input = {
    name: string;
    email: string;
    password_hash: string;
    driver_license: string;
  };

  export type Output = IUser;
}

export { ICreateUserRepository };
