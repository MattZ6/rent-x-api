import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ValidationError } from '@presentation/errors';
import { badRequest, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ListAllCarsController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllCarsUseCase: IListAllCarsUseCase
  ) {}

  async handle(
    request: ListAllCarsController.Request
  ): Promise<ListAllCarsController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const { sort_by, order_by, limit, offset, brand_id, category_id } =
        request.query;

      const output = await this.listAllCarsUseCase.execute({
        sort_by,
        order_by,
        limit,
        offset,
        brand_id,
        category_id,
      });

      return ok(output);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace ListAllCarsController {
  export type SortBy = IListAllCarsUseCase.SortBy;
  export type OrderBy = IListAllCarsUseCase.OrderBy;
  export type Limit = IListAllCarsUseCase.Limit;
  export type Offset = IListAllCarsUseCase.Offset;

  export type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
    brand_id?: string;
    category_id?: string;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarsController };
