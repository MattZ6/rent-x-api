import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate';

import { notFound, ok, unprocessableEntity } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class AuthenticateUserController implements IController {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase
  ) {}

  async handle(
    request: AuthenticateUserController.Request
  ): Promise<AuthenticateUserController.Response> {
    try {
      const { email, password } = request.body;

      const authentication = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return ok(authentication);
    } catch (error) {
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
