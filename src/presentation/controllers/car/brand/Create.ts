import { CarBrandAlreadyExistsWithProvidedNameError } from '@domain/errors';
import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/Create';

import { created, conflict } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class CreateCarBrandController implements IController {
  constructor(private readonly createCarBrandUseCase: ICreateCarBrandUseCase) {}

  async handle(
    request: CreateCarBrandController.Request
  ): Promise<CreateCarBrandController.Response> {
    try {
      const { name } = request.body;

      await this.createCarBrandUseCase.execute({
        name,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof CarBrandAlreadyExistsWithProvidedNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarBrandController {
  type RequestBody = {
    name: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { CreateCarBrandController };
