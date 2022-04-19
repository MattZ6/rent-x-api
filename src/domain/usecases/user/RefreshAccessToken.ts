import { Authentication } from '@domain/entities/Authentication';

interface IRefreshUserAccessTokenUseCase {
  execute(
    data: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output>;
}

namespace IRefreshUserAccessTokenUseCase {
  export type Input = {
    refresh_token: string;
  };

  export type Output = Authentication;
}

export { IRefreshUserAccessTokenUseCase };
