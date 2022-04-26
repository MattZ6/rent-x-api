import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';
import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetPassword';

import { ValidationError } from '@presentation/errors';
import {
  badRequest,
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ResetUserPasswordController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly resetUserPasswordUseCase: IResetUserPasswordUseCase
  ) {}

  async handle(
    request: ResetUserPasswordController.Request
  ): Promise<ResetUserPasswordController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { token, new_password } = request.body;

      await this.resetUserPasswordUseCase.execute({
        token,
        new_password,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

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
  export type RequestBody = {
    token: string;
    new_password: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { ResetUserPasswordController };
