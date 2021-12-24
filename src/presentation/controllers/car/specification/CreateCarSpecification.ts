import { CarSpecificationAlreadyExistsWithThisNameError } from '@domain/errors';
import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/CreateCarSpecification';

import { conflict, created } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
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
      if (error instanceof CarSpecificationAlreadyExistsWithThisNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarSpecificationController {
  type CreateCarSpecificationBodyRequest = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<CreateCarSpecificationBodyRequest>;

  export type Response = IHttpRespose;
}

export { CreateCarSpecificationController };
