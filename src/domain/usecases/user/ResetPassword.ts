interface IResetUserPasswordUseCase {
  execute(
    data: IResetUserPasswordUseCase.Input
  ): Promise<IResetUserPasswordUseCase.Output>;
}

namespace IResetUserPasswordUseCase {
  export type Input = {
    token: string;
    new_password: string;
  };

  export type Output = void;
}

export { IResetUserPasswordUseCase };
