import {
  WrongPasswordError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

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
      if (error instanceof UserNotFoundWithThisEmailError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

type AuthenticateUserBodyRequest = {
  email: string;
  password: string;
};

namespace AuthenticateUserController {
  export type Request = IHttpRequest<AuthenticateUserBodyRequest, void, void>;

  export type Response = IHttpResponse;
}

export { AuthenticateUserController };
