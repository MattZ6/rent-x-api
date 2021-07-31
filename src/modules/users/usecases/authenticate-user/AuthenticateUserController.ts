import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUser = container.resolve(AuthenticateUserUseCase);

    const response = await createUser.execute({
      email,
      password,
    });

    return res.json(response);
  }
}
