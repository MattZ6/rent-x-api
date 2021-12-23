import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { conflict, created } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '@presentation/protocols';

class CreateAccountController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(
    request: CreateAccountController.Request
  ): Promise<CreateAccountController.Response> {
    try {
      const { name, driver_license, email, password } = request.body;

      await this.createUserUseCase.execute({
        name,
        driver_license,
        email,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof UserAlreadyExistsWithThisEmailError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

type CreateAccountBodyRequest = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
};

namespace CreateAccountController {
  export type Request = IHttpRequest<CreateAccountBodyRequest>;

  export type Response = IHttpRespose;
}

export { CreateAccountController };
