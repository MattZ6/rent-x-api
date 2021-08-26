import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddSpecificationsToCarUseCase } from './AddSpecificationsToCarUseCase';

export class AddSpecificationsToCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_ids } = request.body;

    const addSpecificationsToCar = container.resolve(
      AddSpecificationsToCarUseCase
    );

    await addSpecificationsToCar.execute({
      car_id: id,
      specifications_ids,
    });

    return response.send();
  }
}
