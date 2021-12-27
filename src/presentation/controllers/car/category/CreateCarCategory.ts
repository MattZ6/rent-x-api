import { CarCategoryAlreadyExistsWithThisNameError } from '@domain/errors';
import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/CreateCarCategory';

import { conflict, created } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class CreateCarCategoryController implements IController {
  constructor(
    private readonly createCarCategoryUseCase: ICreateCarCategoryUseCase
  ) {}

  async handle(
    request: CreateCarCategoryController.Request
  ): Promise<CreateCarCategoryController.Response> {
    try {
      const { name, description } = request.body;

      await this.createCarCategoryUseCase.execute({
        name,
        description,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof CarCategoryAlreadyExistsWithThisNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateCarCategoryController {
  type CreateCarCategoryBodyRequest = {
    name: string;
    description: string;
  };

  export type Request = IHttpRequest<CreateCarCategoryBodyRequest>;

  export type Response = IHttpResponse;
}

export { CreateCarCategoryController };
