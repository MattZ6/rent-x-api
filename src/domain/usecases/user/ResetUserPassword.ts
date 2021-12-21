export interface IResetUserPasswordUseCase {
  execute(
    data: IResetUserPasswordUseCase.Input
  ): Promise<IResetUserPasswordUseCase.Output>;
}

export namespace IResetUserPasswordUseCase {
  export type Input = {
    token: string;
    new_password: string;
  };

  export type Output = void;
}
