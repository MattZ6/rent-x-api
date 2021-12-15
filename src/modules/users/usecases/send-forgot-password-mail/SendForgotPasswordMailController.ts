import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMail = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgotPasswordMail.execute({ email });

    return response.send();
  }
}
