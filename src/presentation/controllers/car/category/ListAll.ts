import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarCategoriesController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarCategoriesUseCase.SortBy,
    private readonly defaultOrder: IListAllCarCategoriesUseCase.OrderBy,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarCategoriesUseCase: IListAllCarCategoriesUseCase
  ) {}

  async handle(
    request: ListAllCarCategoriesController.Request
  ): Promise<ListAllCarCategoriesController.Response> {
    const {
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
    } = request.query ?? {};

    const specifications = await this.listAllCarCategoriesUseCase.execute({
      sort_by: order_by,
      order_by: order,
      limit,
      offset: page,
    });

    return ok(specifications);
  }
}

namespace ListAllCarCategoriesController {
  type ListCarCategoriesQueryParamsRequest = {
    order_by?: IListAllCarCategoriesUseCase.SortBy;
    order?: IListAllCarCategoriesUseCase.OrderBy;
    limit?: number;
    page?: number;
  };

  export type Request = IHttpRequest<
    void,
    void,
    ListCarCategoriesQueryParamsRequest
  >;

  export type Response = IHttpResponse;
}

export { ListAllCarCategoriesController };
