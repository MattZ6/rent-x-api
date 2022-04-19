import { User } from '@domain/entities/User';

interface ICreateUserRepository {
  create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output>;
}

namespace ICreateUserRepository {
  export type Input = Pick<
    User,
    'name' | 'role' | 'driver_license' | 'email' | 'password_hash'
  >;

  export type Output = User;
}

export { ICreateUserRepository };
