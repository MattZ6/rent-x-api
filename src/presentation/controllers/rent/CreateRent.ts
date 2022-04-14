import {
  CarNotFoundWithThisIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
  UserHasOutstandingRentPaymentsError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { ICreateRentUseCase } from '@domain/usecases/rent/CreateRent';

import {
  conflict,
  created,
  notFound,
  paymentRequired,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class CreateRentController implements IController {
  constructor(private readonly createRentUseCase: ICreateRentUseCase) {}

  async handle(
    request: CreateRentController.Request
  ): Promise<CreateRentController.Response> {
    try {
      const { user_id } = request;
      const { start_date, end_date, car_id } = request.body;

      await this.createRentUseCase.execute({
        car_id,
        user_id,
        start_date,
        expected_return_date: end_date,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof UserHasOutstandingRentPaymentsError) {
        return paymentRequired(error);
      }

      if (error instanceof CarNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof InvalidRentDurationTimeError) {
        return unprocessableEntity(error);
      }

      if (error instanceof CarAlreadyBookedOnThisDateError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateRentController {
  type CreateRentBodyRequest = {
    car_id: string;
    start_date: Date;
    end_date: Date;
  };

  export type Request = IHttpRequest<CreateRentBodyRequest, void, void>;

  export type Response = IHttpResponse;
}

export { CreateRentController };
