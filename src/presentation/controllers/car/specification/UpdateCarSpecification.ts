import {
  CarSpecificationAlreadyExistsWithThisNameError,
  CarSpecificationNotFoundWithThisIdError,
} from '@domain/errors';
import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/UpdateCarSpecification';

import { conflict, noContent, notFound } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '@presentation/protocols';

class UpdateCarSpecificationController implements IController {
  constructor(
    private readonly updateCarSpecificationUseCase: IUpdateCarSpecificationUseCase
  ) {}

  async handle(
    request: UpdateCarSpecificationController.Request
  ): Promise<UpdateCarSpecificationController.Response> {
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      await this.updateCarSpecificationUseCase.execute({
        id,
        name,
        description,
      });

      return noContent();
    } catch (error) {
      if (error instanceof CarSpecificationNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof CarSpecificationAlreadyExistsWithThisNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateCarSpecificationController {
  type UpdateCarSpecificationParamsRequest = {
    id: string;
  };

  type UpdateCarSpecificationBodyRequest = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<
    UpdateCarSpecificationBodyRequest,
    UpdateCarSpecificationParamsRequest
  >;

  export type Response = IHttpRespose;
}

export { UpdateCarSpecificationController };