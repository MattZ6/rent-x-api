import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarCategoriesController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarCategoriesUseCase.OrderBy,
    private readonly defaultOrder: IListAllCarCategoriesUseCase.Order,
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
      order_by,
      order,
      limit,
      page,
    });

    return ok(specifications);
  }
}

namespace ListAllCarCategoriesController {
  type ListCarCategoriesQueryParamsRequest = {
    order_by?: IListAllCarCategoriesUseCase.OrderBy;
    order?: IListAllCarCategoriesUseCase.Order;
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
