import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';
import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetPassword';

import {
  noContent,
  notFound,
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

namespace ResetUserPasswordController {
  type RequestBody = {
    token: string;
    new_password: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { ResetUserPasswordController };
