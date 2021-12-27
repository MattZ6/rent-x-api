import {
  IncorrectPassword,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http/http';
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

      if (error instanceof IncorrectPassword) {
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
  export type Request = IHttpRequest<AuthenticateUserBodyRequest>;

  export type Response = IHttpResponse;
}

export { AuthenticateUserController };
