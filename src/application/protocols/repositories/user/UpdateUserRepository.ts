import { IUser } from '@domain/models/User';

interface IUpdateUserRepository {
  update(data: IUser): Promise<IUser>;
}

namespace IUpdateUserRepository {
  export type Input = IUser;

  export type Output = IUser;
}

export { IUpdateUserRepository };
