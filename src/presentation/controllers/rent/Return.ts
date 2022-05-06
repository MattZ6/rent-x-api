import {
  RentNotFoundWithProvidedIdError,
  RentBelongsToAnotherUserError,
  RentalIsNotInProgressError,
  RentAlreadyClosedError,
} from '@domain/errors';
import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

import { ValidationError } from '@presentation/errors';
import {
  noContent,
  notFound,
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

class ReturnRentController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly returnRentUseCase: IReturnRentUseCase
  ) {}

  async handle(
    request: ReturnRentController.Request
  ): Promise<ReturnRentController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { id: userId } = request.user;
      const { id } = request.params;

      await this.returnRentUseCase.execute({
        user_id: userId,
        rent_id: id,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof RentNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof RentBelongsToAnotherUserError) {
        return notFound(error);
      }

      if (error instanceof RentalIsNotInProgressError) {
        return unprocessableEntity(error);
      }

      if (error instanceof RentAlreadyClosedError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace ReturnRentController {
  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { ReturnRentController };
