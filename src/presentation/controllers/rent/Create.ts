import {
  UserNotFoundWithProvidedIdError,
  UserHasOutstandingRentPaymentsError,
  CarNotFoundWithProvidedIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
} from '@domain/errors';
import { ICreateRentUseCase } from '@domain/usecases/rent/Create';

import { ValidationError } from '@presentation/errors';
import {
  created,
  notFound,
  paymentRequired,
  unprocessableEntity,
  conflict,
  badRequest,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class CreateRentController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createRentUseCase: ICreateRentUseCase
  ) {}

  async handle(
    request: CreateRentController.Request
  ): Promise<CreateRentController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

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
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof UserHasOutstandingRentPaymentsError) {
        return paymentRequired(error);
      }

      if (error instanceof CarNotFoundWithProvidedIdError) {
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
  export type RequestBody = {
    car_id: string;
    start_date: Date;
    end_date: Date;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateRentController };
