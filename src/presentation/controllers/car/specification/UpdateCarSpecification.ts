import {
  CarSpecificationAlreadyExistsWithProvidedNameError,
  CarSpecificationNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/Update';

import { conflict, noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
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
  type UpdateCarSpecificationParamsRequest = {
    id: string;
  };

  type UpdateCarSpecificationBodyRequest = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<
    UpdateCarSpecificationBodyRequest,
    UpdateCarSpecificationParamsRequest,
    void
  >;

  export type Response = IHttpResponse;
}

export { UpdateCarSpecificationController };
