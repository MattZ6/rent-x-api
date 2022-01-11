interface IRefreshUserAccessTokenUseCase {
  execute(
    data: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output>;
}

namespace IRefreshUserAccessTokenUseCase {
  export type Input = {
    refresh_token: string;
  };

  export type Output = {
    access_token: string;
    refresh_token: string;
  };
}

export { IRefreshUserAccessTokenUseCase };
