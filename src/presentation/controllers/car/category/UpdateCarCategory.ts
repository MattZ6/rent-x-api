import {
  CarCategoryAlreadyExistsWithThisNameError,
  CarCategoryNotFoundWithThisIdError,
} from '@domain/errors';
import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/UpdateCarCategory';

import { conflict, noContent, notFound } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class UpdateCarCategoryController implements IController {
  constructor(
    private readonly updateCarCategoryUseCase: IUpdateCarCategoryUseCase
  ) {}

  async handle(
    request: UpdateCarCategoryController.Request
  ): Promise<UpdateCarCategoryController.Response> {
    try {
      const { id } = request.params;
      const { name, description } = request.body;

      await this.updateCarCategoryUseCase.execute({
        id,
        name,
        description,
      });

      return noContent();
    } catch (error) {
      if (error instanceof CarCategoryNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof CarCategoryAlreadyExistsWithThisNameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace UpdateCarCategoryController {
  type UpdateCarCategoryBodyRequest = {
    name: string;
    description: string;
  };

  type UpdateCarCategoryParamsRequest = {
    id: string;
  };

  export type Request = IHttpRequest<
    UpdateCarCategoryBodyRequest,
    UpdateCarCategoryParamsRequest,
    void
  >;

  export type Response = IHttpResponse;
}

export { UpdateCarCategoryController };
