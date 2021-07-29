import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password, driver_license } = req.body;

    const createUser = container.resolve(CreateUserUseCase);

    await createUser.execute({
      name,
      username,
      email,
      password,
      driver_license,
    });

    return res.status(201).send();
  }
}
