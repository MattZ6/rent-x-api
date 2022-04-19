import { User } from '@domain/entities/User';

interface IUpdateUserRepository {
  update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output>;
}

namespace IUpdateUserRepository {
  export type Input = Pick<
    Partial<User>,
    'email' | 'driver_license' | 'name' | 'role' | 'password_hash'
  > &
    Pick<User, 'id'>;

  export type Output = User;
}

export { IUpdateUserRepository };
