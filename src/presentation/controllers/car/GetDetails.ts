import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

import { CarMapper } from '@presentation/dtos';
import { ValidationError } from '@presentation/errors';
import { ok, notFound, badRequest } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class GetCarDetailsController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly getCarDetailsUseCase: IGetCarDetailsUseCase
  ) {}

  async handle(
    request: GetCarDetailsController.Request
  ): Promise<GetCarDetailsController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { id } = request.params;

      const car = await this.getCarDetailsUseCase.execute({ id });

      return ok(CarMapper.toDetailsDTO(car));
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetCarDetailsController {
  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { GetCarDetailsController };
