import { CarSpecificationAlreadyExistsWithProvidedNameError } from '@domain/errors';
import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/Create';

import { ValidationError } from '@presentation/errors';
import { created, conflict, badRequest } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class CreateCarSpecificationController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createCarSpecificationUseCase: ICreateCarSpecificationUseCase
  ) {}

  async handle(
    request: CreateCarSpecificationController.Request
  ): Promise<CreateCarSpecificationController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { name, description } = request.body;

      await this.createCarSpecificationUseCase.execute({ name, description });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarSpecificationAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarSpecificationController {
  export type RequestBody = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateCarSpecificationController };
