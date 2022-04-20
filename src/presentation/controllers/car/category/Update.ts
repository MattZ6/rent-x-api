import {
  CarCategoryAlreadyExistsWithProvidedNameError,
  CarCategoryNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import { conflict, noContent, notFound } from '@presentation/helpers/http';
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
      if (error instanceof CarCategoryNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof CarCategoryAlreadyExistsWithProvidedNameError) {
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