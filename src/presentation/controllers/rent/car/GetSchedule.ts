import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetCarScheduleUseCase } from '@domain/usecases/rent/car/GetSchedule';

import { ValidationError } from '@presentation/errors';
import { badRequest, notFound, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class GetCarScheduleController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly getCarScheduleUseCase: IGetCarScheduleUseCase
  ) {}

  async handle(
    request: GetCarScheduleController.Request
  ): Promise<GetCarScheduleController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { id: car_id } = request.params;

      const output = await this.getCarScheduleUseCase.execute({
        car_id,
      });

      return ok(output);
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

namespace GetCarScheduleController {
  export type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { GetCarScheduleController };
