import {
  UserAlreadyExistsWithProvidedDriverLicenseError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/Create';

import { ValidationError } from '@presentation/errors';
import { badRequest, conflict, created } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class CreateAccountController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createUserUseCase: ICreateUserUseCase
  ) {}

  async handle(
    request: CreateAccountController.Request
  ): Promise<CreateAccountController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { name, driver_license, email, password } = request.body;

      await this.createUserUseCase.execute({
        name,
        driver_license,
        email,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

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
  export type RequestBody = {
    name: string;
    email: string;
    password: string;
    driver_license: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateAccountController };
