import {
  RentAlreadyClosedError,
  RentBelongsToAnotherUserError,
  RentNotFoundWithProvidedIdError,
  RentalIsNotInProgressError,
} from '@domain/errors';
import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

import {
  conflict,
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ReturnRentController implements IController {
  constructor(private readonly returnRentUseCase: IReturnRentUseCase) {}

  async handle(
    request: ReturnRentController.Request
  ): Promise<ReturnRentController.Response> {
    try {
      const { user_id } = request;
      const { id } = request.params;

      await this.returnRentUseCase.execute({
        user_id,
        rent_id: id,
      });

      return noContent();
    } catch (error) {
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
  type ReturnRentRequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<void, ReturnRentRequestParams, void>;

  export type Response = IHttpResponse;
}

export { ReturnRentController };
