import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { CarCategoryMapper } from '@presentation/dtos';
import { ValidationError } from '@presentation/errors';
import { badRequest, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ListAllCarCategoriesController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllCarCategoriesUseCase: IListAllCarCategoriesUseCase
  ) {}

  async handle(
    request: ListAllCarCategoriesController.Request
  ): Promise<ListAllCarCategoriesController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const { sort_by, order_by, limit, offset } = request.query;

      const output = await this.listAllCarCategoriesUseCase.execute({
        sort_by,
        order_by,
        limit,
        offset,
      });

      return ok(CarCategoryMapper.toCategoriesDTO(output));
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace ListAllCarCategoriesController {
  export type SortBy = IListAllCarCategoriesUseCase.SortBy;
  export type OrderBy = IListAllCarCategoriesUseCase.OrderBy;
  export type Limit = IListAllCarCategoriesUseCase.Limit;
  export type Offset = IListAllCarCategoriesUseCase.Offset;

  export type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarCategoriesController };
