import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentUseCase } from './DevolutionRentUseCase';

export class DevolutionRentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { id } = request.params;

    const devolutionRentUseCase = container.resolve(DevolutionRentUseCase);

    const rent = await devolutionRentUseCase.execute({
      id,
      user_id,
    });

    return response.json(rent);
  }
}
