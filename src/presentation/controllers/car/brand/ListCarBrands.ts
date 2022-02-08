import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAllCarBrands';

import { ok } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListCarBrandsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarBrandsUseCase.OrderBy,
    private readonly defaultOrder: IListAllCarBrandsUseCase.Order,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarBrandsUseCase: IListAllCarBrandsUseCase
  ) {}

  async handle(
    request: ListCarBrandsController.Request
  ): Promise<ListCarBrandsController.Response> {
    const {
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
    } = request.query ?? {};

    const brands = await this.listAllCarBrandsUseCase.execute({
      order_by,
      order,
      limit,
      page,
    });

    return ok(brands);
  }
}

namespace ListCarBrandsController {
  type ListCarBrandsQueryParamsRequest = {
    order_by?: IListAllCarBrandsUseCase.OrderBy;
    order?: IListAllCarBrandsUseCase.Order;
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

export { ListCarBrandsController };
