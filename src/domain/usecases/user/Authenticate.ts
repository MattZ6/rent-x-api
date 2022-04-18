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

  export type Output = {
    access_token: string;
    refresh_token: string;
  };
}

export { IAuthenticateUserUseCase };
