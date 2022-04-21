import {
  CarCategoryNotFoundWithProvidedIdError,
  CarCategoryAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

import { noContent, notFound, conflict } from '@presentation/helpers/http';
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
  type RequestBody = {
    name: string;
    description: string;
  };

  type RequestParams = {
    id: string;
  };

  export type Request = IHttpRequest<RequestBody, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateCarCategoryController };
