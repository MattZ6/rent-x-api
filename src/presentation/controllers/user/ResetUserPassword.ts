import {
  TokenExpiredError,
  UserNotFoundWithThisIdError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';
import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetUserPassword';

import {
  notFound,
  noContent,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ResetUserPasswordController implements IController {
  constructor(
    private readonly resetUserPasswordUseCase: IResetUserPasswordUseCase
  ) {}

  async handle(
    request: ResetUserPasswordController.Request
  ): Promise<ResetUserPasswordController.Response> {
    try {
      const { token, new_password } = request.body;

      await this.resetUserPasswordUseCase.execute({
        token,
        new_password,
      });

      return noContent();
    } catch (error) {
      if (error instanceof UserTokenNotFoundWithThisTokenError) {
        return notFound(error);
      }

      if (error instanceof TokenExpiredError) {
        return unprocessableEntity(error);
      }

      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace ResetUserPasswordController {
  type ResetUserPasswordBodyRequest = {
    token: string;
    new_password: string;
  };

  export type Request = IHttpRequest<ResetUserPasswordBodyRequest, void, void>;

  export type Response = IHttpResponse;
}

export { ResetUserPasswordController };
