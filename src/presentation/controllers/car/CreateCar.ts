import {
  CarAlreadyExistsWithThisLicensePlateError,
  CarBrandNotFoundWithThisIdError,
  CarCategoryNotFoundWithThisIdError,
  OneOrMoreCarSpecificationsNotFoundWithThisIdsError,
} from '@domain/errors';
import { ICreateCarUseCase } from '@domain/usecases/car/CreateCar';

import { conflict, created, notFound } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class CreateCarController implements IController {
  constructor(private readonly createCarUseCase: ICreateCarUseCase) {}

  async handle(
    request: CreateCarController.Request
  ): Promise<CreateCarController.Response> {
    try {
      const {
        name,
        description,
        category_id,
        brand_id,
        daily_rate,
        license_plate,
        fine_amount,
        specifications_ids,
      } = request.body;

      await this.createCarUseCase.execute({
        name,
        description,
        brand_id,
        category_id,
        license_plate,
        fine_amount,
        daily_rate,
        specifications_ids,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof CarAlreadyExistsWithThisLicensePlateError) {
        return conflict(error);
      }

      if (error instanceof CarBrandNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof CarCategoryNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof OneOrMoreCarSpecificationsNotFoundWithThisIdsError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace CreateCarController {
  type CreateCarBodyRequest = {
    name: string;
    description: string;
    license_plate: string;
    daily_rate: number;
    fine_amount: number;
    brand_id: string;
    category_id: string;
    specifications_ids?: string[];
  };

  export type Request = IHttpRequest<CreateCarBodyRequest>;

  export type Response = IHttpResponse;
}

export { CreateCarController };
