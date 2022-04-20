import {
  UserTokenExpiredError,
  UserTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshAccessToken';

import { notFound, ok, unprocessableEntity } from '@presentation/helpers/http';
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
      if (error instanceof UserTokenNotFoundWithProvidedTokenError) {
        return notFound(error);
      }

      if (error instanceof UserTokenExpiredError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace RefreshUserAccessTokenController {
  type RequestBody = {
    refresh_token: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { RefreshUserAccessTokenController };
