import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { ok, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class GetCarDetailsController implements IController {
  constructor(private readonly getCarDetailsUseCase: IGetCarDetailsUseCase) {}

  async handle(
    request: GetCarDetailsController.Request
  ): Promise<GetCarDetailsController.Response> {
    try {
      const { id } = request.params;

      const car = await this.getCarDetailsUseCase.execute({ id });

      return ok(car);
    } catch (error) {
      if (error instanceof CarNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetCarDetailsController {
  type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { GetCarDetailsController };
