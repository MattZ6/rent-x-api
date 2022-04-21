import {
  CarBrandNotFoundWithProvidedIdError,
  CarBrandAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

import { noContent, notFound, conflict } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class UpdateCarBrandController implements IController {
  constructor(private readonly updateCarBrandUseCase: IUpdateCarBrandUseCase) {}

  async handle(
    request: UpdateCarBrandController.Request
  ): Promise<UpdateCarBrandController.Response> {
    try {
      const { id } = request.params;
      const { name } = request.body;

      await this.updateCarBrandUseCase.execute({
        id,
        name,
      });

      return noContent();
    } catch (error) {
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
  type RequestBody = {
    name: string;
  };

  type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<RequestBody, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateCarBrandController };
