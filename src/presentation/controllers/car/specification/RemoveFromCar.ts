import {
  CarNotFoundWithProvidedIdError,
  CarSpecificationNotFoundWithProvidedIdError,
  NotFoundWithProvidedIdFromCar,
} from '@domain/errors';
import { IRemoveSpecificationFromCarUseCase } from '@domain/usecases/car/specification/RemoveFromCar';

import { ValidationError } from '@presentation/errors';
import { badRequest, notFound, noContent } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class RemoveSpecificationFromCarController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly removeSpecificationFromCarUseCase: IRemoveSpecificationFromCarUseCase
  ) {}

  async handle(
    request: RemoveSpecificationFromCarController.Request
  ): Promise<RemoveSpecificationFromCarController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { id, specification_id } = request.params;

      await this.removeSpecificationFromCarUseCase.execute({
        car_id: id,
        specification_id,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof CarSpecificationNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof NotFoundWithProvidedIdFromCar) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace RemoveSpecificationFromCarController {
  export type RequestParams = {
    id: string;
    specification_id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { RemoveSpecificationFromCarController };
