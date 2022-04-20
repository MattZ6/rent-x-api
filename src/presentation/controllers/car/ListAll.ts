import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarsUseCase.SortBy,
    private readonly defaultOrder: IListAllCarsUseCase.OrderBy,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarsUseCase: IListAllCarsUseCase
  ) {}

  async handle(
    request: ListAllCarsController.Request
  ): Promise<ListAllCarsController.Response> {
    const {
      sort_by: order_by = this.defaultOrderBy,
      order_by: order = this.defaultOrder,
      limit = this.defaultLimit,
      offset: page = this.defaultPage,
    } = request.query ?? {};

    const cars = await this.listAllCarsUseCase.execute({
      sort_by: order_by,
      order_by: order,
      limit,
      offset: page,
    });

    return ok(cars);
  }
}

namespace ListAllCarsController {
  export type SortBy = IListAllCarsUseCase.SortBy;
  export type OrderBy = IListAllCarsUseCase.OrderBy;
  export type Limit = IListAllCarsUseCase.Limit;
  export type Offset = IListAllCarsUseCase.Offset;

  type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
    brand_id?: string;
    category_id?: string;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarsController };
