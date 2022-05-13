import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdatePassword';

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

class UpdateUserPasswordController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserPasswordUseCase: IUpdateUserPasswordUseCase
  ) {}

  async handle(
    request: UpdateUserPasswordController.Request
  ): Promise<UpdateUserPasswordController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { id: userId } = request.user;
      const { new_password, old_password } = request.body;

      await this.updateUserPasswordUseCase.execute({
        id: userId,
        new_password,
        old_password,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace UpdateUserPasswordController {
  export type RequestBody = Pick<
    IUpdateUserPasswordUseCase.Input,
    'new_password' | 'old_password'
  >;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateUserPasswordController };
