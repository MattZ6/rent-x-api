import { UserNotFoundWithProvidedEmailError } from '@domain/errors';
import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotUserPasssordMail';

import { noContent } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class SendForgotUserPasswordMailController implements IController {
  constructor(
    private readonly sendForgotUserPasswordMailUseCase: ISendForgotUserPasswordMailUseCase
  ) {}

  async handle(
    request: SendForgotUserPasswordMailController.Request
  ): Promise<SendForgotUserPasswordMailController.Response> {
    try {
      const { email } = request.body;

      await this.sendForgotUserPasswordMailUseCase.execute({
        email,
      });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedEmailError) {
        return noContent();
      }

      throw error;
    }
  }
}

namespace SendForgotUserPasswordMailController {
  type SendForgotUserPasswordMailBodyRequest = {
    email: string;
  };

  export type Request = IHttpRequest<
    SendForgotUserPasswordMailBodyRequest,
    void,
    void
  >;

  export type Response = IHttpResponse;
}

export { SendForgotUserPasswordMailController };
