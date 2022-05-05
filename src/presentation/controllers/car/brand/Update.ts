import {
  CarBrandNotFoundWithProvidedIdError,
  CarBrandAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

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

class UpdateCarBrandController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateCarBrandUseCase: IUpdateCarBrandUseCase
  ) {}

  async handle(
    request: UpdateCarBrandController.Request
  ): Promise<UpdateCarBrandController.Response> {
    try {
      const validationError = this.validation.validate({
        ...request.params,
        ...request.body,
      });

      if (validationError) {
        throw validationError;
      }

      const { id } = request.params;
      const { name } = request.body;

      await this.updateCarBrandUseCase.execute({
        id,
        name,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarBrandNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof CarBrandAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateCarBrandController {
  export type RequestBody = {
    name: string;
  };

  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<RequestBody, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateCarBrandController };
