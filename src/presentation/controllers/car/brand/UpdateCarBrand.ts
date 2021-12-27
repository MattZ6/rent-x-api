import {
  CarBrandAlreadyExistsWithThisNameError,
  CarBrandNotFoundWithThisIdError,
} from '@domain/errors';
import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/UpdateCarBrand';

import { conflict, noContent, notFound } from '@presentation/helpers/http/http';
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
      if (error instanceof CarBrandNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof CarBrandAlreadyExistsWithThisNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateCarBrandController {
  type UpdateCarBrandBodyRequest = {
    name: string;
  };

  type UpdateCarBrandParamsRequest = {
    id: string;
  };

  export type Request = IHttpRequest<
    UpdateCarBrandBodyRequest,
    UpdateCarBrandParamsRequest
  >;

  export type Response = IHttpResponse;
}

export { UpdateCarBrandController };