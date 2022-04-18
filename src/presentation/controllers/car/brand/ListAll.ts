import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarBrandsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarBrandsUseCase.OrderBy,
    private readonly defaultOrder: IListAllCarBrandsUseCase.Order,
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
      order_by,
      order,
      limit,
      page,
    });

    return ok(brands);
  }
}

namespace ListAllCarBrandsController {
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

export { ListAllCarBrandsController };
