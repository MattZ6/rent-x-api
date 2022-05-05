import { UserNotFoundWithProvidedEmailError } from '@domain/errors';
import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotPasssordMail';

import { ValidationError } from '@presentation/errors';
import { badRequest, noContent } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class SendForgotUserPasswordMailController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly sendForgotUserPasswordMailUseCase: ISendForgotUserPasswordMailUseCase
  ) {}

  async handle(
    request: SendForgotUserPasswordMailController.Request
  ): Promise<SendForgotUserPasswordMailController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { email } = request.body;

      await this.sendForgotUserPasswordMailUseCase.execute({
        email,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedEmailError) {
        return noContent();
      }

      throw error;
    }
  }
}

namespace SendForgotUserPasswordMailController {
  export type RequestBody = {
    email: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { SendForgotUserPasswordMailController };
