import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateEmail';

import { ValidationError } from '@presentation/errors';
import { badRequest, conflict, noContent } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class UpdateUserEmailController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserEmailUseCase: IUpdateUserEmailUseCase
  ) {}

  async handle(
    request: UpdateUserEmailController.Request
  ): Promise<UpdateUserEmailController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { id: userId } = request.user;
      const { email } = request.body;

      await this.updateUserEmailUseCase.execute({
        id: userId,
        email,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserAlreadyExistsWithProvidedEmailError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateUserEmailController {
  export type RequestBody = {
    email: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateUserEmailController };
