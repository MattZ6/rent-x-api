import { CarNotFoundWithThisIdError } from '@domain/errors';
import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetCarDetails';

import { notFound, ok } from '@presentation/helpers/http/http';
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

      const car = await this.getCarDetailsUseCase.execute({ car_id: id });

      return ok(car);
    } catch (error) {
      if (error instanceof CarNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetCarDetailsController {
  type GetCarDetailsControllerParamsRequest = {
    id: string;
  };

  export type Request = IHttpRequest<
    void,
    GetCarDetailsControllerParamsRequest,
    void
  >;

  export type Response = IHttpResponse;
}

export { GetCarDetailsController };
