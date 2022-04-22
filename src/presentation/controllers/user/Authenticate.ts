import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate';

import { ValidationError } from '@presentation/errors';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class AuthenticateUserController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase
  ) {}

  async handle(
    request: AuthenticateUserController.Request
  ): Promise<AuthenticateUserController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { email, password } = request.body;

      const authentication = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return ok(authentication);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedEmailError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace AuthenticateUserController {
  export type RequestBody = {
    email: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { AuthenticateUserController };
