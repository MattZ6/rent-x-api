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
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
    } = request.query ?? {};

    const specifications = await this.listAllCarSpecificationsUseCase.execute({
      sort_by: order_by,
      order_by: order,
      limit,
      offset: page,
    });

    return ok(specifications);
  }
}

namespace ListAllCarSpecificationsController {
  type ListCarSpecificationsQueryParamsRequest = {
    order_by?: IListAllCarSpecificationsUseCase.SortBy;
    order?: IListAllCarSpecificationsUseCase.OrderBy;
    limit?: number;
    page?: number;
  };

  export type Request = IHttpRequest<
    void,
    void,
    ListCarSpecificationsQueryParamsRequest
  >;

  export type Response = IHttpResponse;
}

export { ListAllCarSpecificationsController };
