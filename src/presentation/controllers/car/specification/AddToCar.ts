import {
  CarNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsAlreadyRelatedToCarError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';
import { IAddSpecificationsToCarUseCase } from '@domain/usecases/car/specification/AddToCar';

import { ValidationError } from '@presentation/errors';
import {
  created,
  conflict,
  badRequest,
  notFound,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class AddSpecificationsToCarController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addSpecificationsToCarUseCase: IAddSpecificationsToCarUseCase
  ) {}

  async handle(
    request: AddSpecificationsToCarController.Request
  ): Promise<AddSpecificationsToCarController.Response> {
    try {
      const validationError = this.validation.validate({
        ...request.body,
        ...request.params,
      });

      if (validationError) {
        throw validationError;
      }

      const { id } = request.params;
      const { specifications_ids } = request.body;

      await this.addSpecificationsToCarUseCase.execute({
        car_id: id,
        specifications_ids,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (
        error instanceof OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError
      ) {
        return notFound(error);
      }

      if (error instanceof OneOrMoreCarSpecificationsAlreadyRelatedToCarError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace AddSpecificationsToCarController {
  export type RequestBody = {
    specifications_ids: string[];
  };

  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<RequestBody, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { AddSpecificationsToCarController };
