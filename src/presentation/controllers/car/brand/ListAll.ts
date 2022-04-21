import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarBrandsController implements IController {
  constructor(
    private readonly listAllCarBrandsUseCase: IListAllCarBrandsUseCase
  ) {}

  async handle(
    request: ListAllCarBrandsController.Request
  ): Promise<ListAllCarBrandsController.Response> {
    const { sort_by, order_by, limit, offset } = request.query;

    const output = await this.listAllCarBrandsUseCase.execute({
      sort_by,
      order_by,
      limit,
      offset,
    });

    return ok(output);
  }
}

namespace ListAllCarBrandsController {
  export type SortBy = IListAllCarBrandsUseCase.SortBy;
  export type OrderBy = IListAllCarBrandsUseCase.OrderBy;
  export type Limit = IListAllCarBrandsUseCase.Limit;
  export type Offset = IListAllCarBrandsUseCase.Offset;

  type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarBrandsController };
