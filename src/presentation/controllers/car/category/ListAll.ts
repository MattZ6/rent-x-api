import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarCategoriesController implements IController {
  constructor(
    private readonly listAllCarCategoriesUseCase: IListAllCarCategoriesUseCase
  ) {}

  async handle(
    request: ListAllCarCategoriesController.Request
  ): Promise<ListAllCarCategoriesController.Response> {
    const { sort_by, order_by, limit, offset } = request.query;

    const output = await this.listAllCarCategoriesUseCase.execute({
      sort_by,
      order_by,
      limit,
      offset,
    });

    return ok(output);
  }
}

namespace ListAllCarCategoriesController {
  export type SortBy = IListAllCarCategoriesUseCase.SortBy;
  export type OrderBy = IListAllCarCategoriesUseCase.OrderBy;
  export type Limit = IListAllCarCategoriesUseCase.Limit;
  export type Offset = IListAllCarCategoriesUseCase.Offset;

  type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarCategoriesController };
