import {
  CarAlreadyExistsWithProvidedLicensePlateError,
  CarBrandNotFoundWithProvidedIdError,
  CarCategoryNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';
import { ICreateCarUseCase } from '@domain/usecases/car/Create';

import { created, conflict, notFound } from '@presentation/helpers/http';
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
        daily_late_fee,
        horse_power,
        max_speed,
        number_of_seats,
        transmission_type,
        type_of_fuel,
        zero_to_one_hundred_in_millisseconds,
        specifications_ids,
      } = request.body;

      await this.createCarUseCase.execute({
        name,
        description,
        brand_id,
        category_id,
        license_plate,
        daily_late_fee,
        daily_rate,
        horse_power,
        max_speed,
        number_of_seats,
        transmission_type,
        type_of_fuel,
        zero_to_one_hundred_in_millisseconds,
        specifications_ids,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof CarAlreadyExistsWithProvidedLicensePlateError) {
        return conflict(error);
      }

      if (error instanceof CarBrandNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof CarCategoryNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (
        error instanceof OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError
      ) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace CreateCarController {
  type RequestBody = ICreateCarUseCase.Input;

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateCarController };
