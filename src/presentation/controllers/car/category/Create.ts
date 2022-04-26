import { CarCategoryAlreadyExistsWithProvidedNameError } from '@domain/errors';
import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/Create';

import { ValidationError } from '@presentation/errors';
import { created, conflict, badRequest } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class CreateCarCategoryController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createCarCategoryUseCase: ICreateCarCategoryUseCase
  ) {}

  async handle(
    request: CreateCarCategoryController.Request
  ): Promise<CreateCarCategoryController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { name, description } = request.body;

      await this.createCarCategoryUseCase.execute({
        name,
        description,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarCategoryAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarCategoryController {
  export type RequestBody = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateCarCategoryController };
