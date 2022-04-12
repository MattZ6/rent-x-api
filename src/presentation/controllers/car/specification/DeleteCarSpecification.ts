import { CarSpecificationNotFoundWithThisIdError } from '@domain/errors';
import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/DeleteCarSpecification';

import { noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class DeleteCarSpecificationController implements IController {
  constructor(
    private readonly deleteCarSpecificationUseCase: IDeleteCarSpecificationUseCase
  ) {}

  async handle(
    request: DeleteCarSpecificationController.Request
  ): Promise<DeleteCarSpecificationController.Response> {
    try {
      const { id } = request.params;

      await this.deleteCarSpecificationUseCase.execute({ id });

      return noContent();
    } catch (error) {
      if (error instanceof CarSpecificationNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace DeleteCarSpecificationController {
  type DeleteCarSpecificationParamRequest = {
    id: string;
  };

  export type Request = IHttpRequest<
    void,
    DeleteCarSpecificationParamRequest,
    void
  >;

  export type Response = IHttpResponse;
}

export { DeleteCarSpecificationController };
