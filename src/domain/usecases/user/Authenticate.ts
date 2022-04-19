import { Authentication } from '@domain/entities/Authentication';

interface IAuthenticateUserUseCase {
  execute(
    data: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output>;
}

namespace IAuthenticateUserUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = Authentication;
}

export { IAuthenticateUserUseCase };
