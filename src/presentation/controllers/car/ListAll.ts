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
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
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
  type ListAllCarsQueryParamsRequest = {
    order_by?: IListAllCarsUseCase.SortBy;
    order?: IListAllCarsUseCase.OrderBy;
    limit?: number;
    page?: number;
  };

  export type Request = IHttpRequest<void, void, ListAllCarsQueryParamsRequest>;

  export type Response = IHttpResponse;
}

export { ListAllCarsController };
