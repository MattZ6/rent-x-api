import {
  CarSpecificationNotFoundWithProvidedIdError,
  CarSpecificationAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/Update';

import { ValidationError } from '@presentation/errors';
import {
  noContent,
  notFound,
  conflict,
  badRequest,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class UpdateCarSpecificationController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateCarSpecificationUseCase: IUpdateCarSpecificationUseCase
  ) {}

  async handle(
    request: UpdateCarSpecificationController.Request
  ): Promise<UpdateCarSpecificationController.Response> {
    try {
      const validationError = this.validation.validate({
        ...request.body,
        ...request.params,
      });

      if (validationError) {
        throw validationError;
      }

      const { id } = request.params;
      const { name, description } = request.body;

      await this.updateCarSpecificationUseCase.execute({
        id,
        name,
        description,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarSpecificationNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof CarSpecificationAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateCarSpecificationController {
  export type RequestBody = {
    name: string;
    description: string;
  };

  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<RequestBody, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateCarSpecificationController };
