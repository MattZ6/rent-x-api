import { User } from '@domain/entities/User';

interface ICreateUserUseCase {
  execute(data: ICreateUserUseCase.Input): Promise<ICreateUserUseCase.Output>;
}

namespace ICreateUserUseCase {
  export type Input = Pick<
    User,
    'name' | 'role' | 'driver_license' | 'email'
  > & { password: string };

  export type Output = User;
}

export { ICreateUserUseCase };
