import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListCarsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarsUseCase.OrderBy,
    private readonly defaultOrder: IListAllCarsUseCase.Order,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarsUseCase: IListAllCarsUseCase
  ) {}

  async handle(
    request: ListCarsController.Request
  ): Promise<ListCarsController.Response> {
    const {
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
    } = request.query ?? {};

    const cars = await this.listAllCarsUseCase.execute({
      order_by,
      order,
      limit,
      page,
    });

    return ok(cars);
  }
}

namespace ListCarsController {
  type ListAllCarsQueryParamsRequest = {
    order_by?: IListAllCarsUseCase.OrderBy;
    order?: IListAllCarsUseCase.Order;
    limit?: number;
    page?: number;
  };

  export type Request = IHttpRequest<void, void, ListAllCarsQueryParamsRequest>;

  export type Response = IHttpResponse;
}

export { ListCarsController };
