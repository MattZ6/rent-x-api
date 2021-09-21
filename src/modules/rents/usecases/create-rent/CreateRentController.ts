import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentUseCase } from './CreateRentUseCase';

export class CreateRentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { car_id, expected_return_date } = request.body;

    const createRent = container.resolve(CreateRentUseCase);

    const rent = await createRent.execute({
      user_id,
      car_id,
      expected_return_date,
    });

    return response.status(201).json(rent);
  }
}
