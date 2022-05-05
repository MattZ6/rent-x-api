import {
  CarCategoryNotFoundWithProvidedIdError,
  CarCategoryAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

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

class UpdateCarCategoryController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateCarCategoryUseCase: IUpdateCarCategoryUseCase
  ) {}

  async handle(
    request: UpdateCarCategoryController.Request
  ): Promise<UpdateCarCategoryController.Response> {
    try {
      const validationError = this.validation.validate({
        ...request.params,
        ...request.body,
      });

      if (validationError) {
        throw validationError;
      }

      const { id } = request.params;
      const { name, description } = request.body;

      await this.updateCarCategoryUseCase.execute({
        id,
        name,
        description,
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarCategoryNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof CarCategoryAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateCarCategoryController {
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

export { UpdateCarCategoryController };
