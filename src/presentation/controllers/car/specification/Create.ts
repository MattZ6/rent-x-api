import { CarSpecificationAlreadyExistsWithProvidedNameError } from '@domain/errors';
import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/Create';

import { created, conflict } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class CreateCarSpecificationController implements IController {
  constructor(
    private readonly createCarSpecificationUseCase: ICreateCarSpecificationUseCase
  ) {}

  async handle(
    request: CreateCarSpecificationController.Request
  ): Promise<CreateCarSpecificationController.Response> {
    try {
      const { name, description } = request.body;

      await this.createCarSpecificationUseCase.execute({ name, description });

      return created<void>();
    } catch (error) {
      if (error instanceof CarSpecificationAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarSpecificationController {
  type RequestBody = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateCarSpecificationController };
