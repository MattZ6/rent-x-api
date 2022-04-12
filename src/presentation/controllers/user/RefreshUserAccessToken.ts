import {
  TokenExpiredError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class RefreshUserAccessTokenController implements IController {
  constructor(
    private readonly refreshUserAccessTokenUseCase: IRefreshUserAccessTokenUseCase
  ) {}

  async handle(
    request: RefreshUserAccessTokenController.Request
  ): Promise<RefreshUserAccessTokenController.Response> {
    try {
      const { refresh_token } = request.body;

      const authentication = await this.refreshUserAccessTokenUseCase.execute({
        refresh_token,
      });

      return ok(authentication);
    } catch (error) {
      if (error instanceof UserTokenNotFoundWithThisTokenError) {
        return notFound(error);
      }

      if (error instanceof TokenExpiredError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace RefreshUserAccessTokenController {
  type RefreshUserAccessTokenBodyRequest = {
    refresh_token: string;
  };

  export type Request = IHttpRequest<
    RefreshUserAccessTokenBodyRequest,
    void,
    void
  >;

  export type Response = IHttpResponse;
}

export { RefreshUserAccessTokenController };
