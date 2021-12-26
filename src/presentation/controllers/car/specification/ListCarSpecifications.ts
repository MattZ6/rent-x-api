import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAllCarSpecifications';

import { ok } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '@presentation/protocols';

class ListCarSpecificationsController implements IController {
  constructor(
    private readonly defaultOrderBy: IListAllCarSpecificationsUseCase.OrderBy,
    private readonly defaultOrder: IListAllCarSpecificationsUseCase.Order,
    private readonly defaultLimit: number,
    private readonly defaultPage: number,
    private readonly listAllCarSpecificationsUseCase: IListAllCarSpecificationsUseCase
  ) {}

  async handle(
    request: ListCarSpecificationsController.Request
  ): Promise<ListCarSpecificationsController.Response> {
    const {
      order_by = this.defaultOrderBy,
      order = this.defaultOrder,
      limit = this.defaultLimit,
      page = this.defaultPage,
    } = request.query ?? {};

    const specifications = await this.listAllCarSpecificationsUseCase.execute({
      order_by,
      order,
      limit,
      page,
    });

    return ok(specifications);
  }
}

namespace ListCarSpecificationsController {
  type ListCarSpecificationQueryParamsRequest = {
    order_by?: IListAllCarSpecificationsUseCase.OrderBy;
    order?: IListAllCarSpecificationsUseCase.Order;
    limit?: number;
    page?: number;
  };

  export type Request = IHttpRequest<
    void,
    void,
    ListCarSpecificationQueryParamsRequest
  >;

  export type Response = IHttpRespose;
}

export { ListCarSpecificationsController };
