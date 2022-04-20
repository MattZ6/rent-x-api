import {
  UserAlreadyExistsWithProvidedDriverLicenseError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/Create';

import { conflict, created } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
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
      if (error instanceof UserAlreadyExistsWithProvidedEmailError) {
        return conflict(error);
      }

      if (error instanceof UserAlreadyExistsWithProvidedDriverLicenseError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateAccountController {
  type RequestBody = {
    name: string;
    email: string;
    password: string;
    driver_license: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateAccountController };
