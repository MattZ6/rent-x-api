export interface IAuthenticateUserUseCase {
  execute(
    data: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output>;
}

export namespace IAuthenticateUserUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    access_token: string;
    refresh_token: string;
  };
}
