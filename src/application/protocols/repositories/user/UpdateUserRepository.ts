import { IUser } from '@domain/entities/User';

interface IUpdateUserRepository {
  update(data: IUser): Promise<IUser>;
}

namespace IUpdateUserRepository {
  export type Input = IUser;

  export type Output = IUser;
}

export { IUpdateUserRepository };
