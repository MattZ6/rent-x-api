import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateName';

import { ValidationError } from '@presentation/errors';
import { badRequest, noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class UpdateUserNameController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserNameUseCase: IUpdateUserNameUseCase
  ) {}

  async handle(
    request: UpdateUserNameController.Request
  ): Promise<UpdateUserNameController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { id: userId } = request.user;
      const { name } = request.body;

      await this.updateUserNameUseCase.execute({
        id: userId,
        name,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace UpdateUserNameController {
  export type RequestBody = {
    name: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateUserNameController };
