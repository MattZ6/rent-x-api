import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

import { ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class ListAllCarSpecificationsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarSpecificationsUseCase.SortBy,
    private readonly defaultOrder: IListAllCarSpecificationsUseCase.OrderBy,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarSpecificationsUseCase: IListAllCarSpecificationsUseCase
  ) {}

  async handle(
    request: ListAllCarSpecificationsController.Request
  ): Promise<ListAllCarSpecificationsController.Response> {
    const {
      sort_by = this.defaultOrderBy,
      order_by = this.defaultOrder,
      limit = this.defaultLimit,
      offset = this.defaultPage,
    } = request.query ?? {};

    const specifications = await this.listAllCarSpecificationsUseCase.execute({
      sort_by,
      order_by,
      limit,
      offset,
    });

    return ok(specifications);
  }
}

namespace ListAllCarSpecificationsController {
  export type SortBy = IListAllCarSpecificationsUseCase.SortBy;
  export type OrderBy = IListAllCarSpecificationsUseCase.OrderBy;
  export type Limit = IListAllCarSpecificationsUseCase.Limit;
  export type Offset = IListAllCarSpecificationsUseCase.Offset;

  type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarSpecificationsController };
