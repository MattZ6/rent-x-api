import { CarSpecificationNotFoundWithProvidedIdError } from '@domain/errors';
import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/Delete';

import { ValidationError } from '@presentation/errors';
import { badRequest, noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class DeleteCarSpecificationController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly deleteCarSpecificationUseCase: IDeleteCarSpecificationUseCase
  ) {}

  async handle(
    request: DeleteCarSpecificationController.Request
  ): Promise<DeleteCarSpecificationController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { id } = request.params;

      await this.deleteCarSpecificationUseCase.execute({ id });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarSpecificationNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace DeleteCarSpecificationController {
  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { DeleteCarSpecificationController };
