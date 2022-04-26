import { CarBrandAlreadyExistsWithProvidedNameError } from '@domain/errors';
import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/Create';

import { ValidationError } from '@presentation/errors';
import { created, conflict, badRequest } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class CreateCarBrandController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createCarBrandUseCase: ICreateCarBrandUseCase
  ) {}

  async handle(
    request: CreateCarBrandController.Request
  ): Promise<CreateCarBrandController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { name } = request.body;

      await this.createCarBrandUseCase.execute({
        name,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarBrandAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarBrandController {
  export type RequestBody = {
    name: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateCarBrandController };
