import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

interface IQueryParams {
  name?: string;
  brand?: string;
  category_id?: string;
}

export class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query as IQueryParams;

    const listAvailableCars = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCars.execute({ name, brand, category_id });

    return response.json(cars);
  }
}
