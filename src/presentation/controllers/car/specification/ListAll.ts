import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

import { CarSpecificationMapper } from '@presentation/dtos/car/specification';
import { ValidationError } from '@presentation/errors';
import { badRequest, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ListAllCarSpecificationsController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllCarSpecificationsUseCase: IListAllCarSpecificationsUseCase
  ) {}

  async handle(
    request: ListAllCarSpecificationsController.Request
  ): Promise<ListAllCarSpecificationsController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const { sort_by, order_by, limit, offset } = request.query;

      const specifications = await this.listAllCarSpecificationsUseCase.execute(
        {
          sort_by,
          order_by,
          limit,
          offset,
        }
      );

      return ok(CarSpecificationMapper.toSpecificationsDTO(specifications));
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace ListAllCarSpecificationsController {
  export type SortBy = IListAllCarSpecificationsUseCase.SortBy;
  export type OrderBy = IListAllCarSpecificationsUseCase.OrderBy;
  export type Limit = IListAllCarSpecificationsUseCase.Limit;
  export type Offset = IListAllCarSpecificationsUseCase.Offset;

  export type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarSpecificationsController };
