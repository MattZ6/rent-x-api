import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarsController implements IController {
  constructor(private readonly listAllCarsUseCase: IListAllCarsUseCase) {}

  async handle(
    request: ListAllCarsController.Request
  ): Promise<ListAllCarsController.Response> {
    const { sort_by, order_by, limit, offset, brand_id, category_id } =
      request.query;

    const output = await this.listAllCarsUseCase.execute({
      sort_by,
      order_by,
      limit,
      offset,
      brand_id,
      category_id,
    });

    return ok(output);
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
