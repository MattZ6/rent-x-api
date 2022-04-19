import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarBrandsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarBrandsUseCase.SortBy,
    private readonly defaultOrder: IListAllCarBrandsUseCase.OrderBy,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarBrandsUseCase: IListAllCarBrandsUseCase
  ) {}

  async handle(
    request: ListAllCarBrandsController.Request
  ): Promise<ListAllCarBrandsController.Response> {
    const {
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
    } = request.query ?? {};

    const brands = await this.listAllCarBrandsUseCase.execute({
      sort_by: order_by,
      order_by: order,
      limit,
      offset: page,
    });

    return ok(brands);
  }
}

namespace ListAllCarBrandsController {
  type ListCarBrandsQueryParamsRequest = {
    order_by?: IListAllCarBrandsUseCase.SortBy;
    order?: IListAllCarBrandsUseCase.OrderBy;
    limit?: number;
    page?: number;
  };

  export type Request = IHttpRequest<
    void,
    void,
    ListCarBrandsQueryParamsRequest
  >;

  export type Response = IHttpResponse;
}

export { ListAllCarBrandsController };
