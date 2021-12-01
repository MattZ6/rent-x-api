import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentsByUserUseCase } from './ListRentsByUserUseCase';

export class ListRentsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listRentsByUser = container.resolve(ListRentsByUserUseCase);

    const rents = await listRentsByUser.execute({ user_id });

    return response.json(rents);
  }
}
