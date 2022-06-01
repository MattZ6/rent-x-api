import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { CarBrandMapper } from '@presentation/dtos';
import { ValidationError } from '@presentation/errors';
import { badRequest, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ListAllCarBrandsController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllCarBrandsUseCase: IListAllCarBrandsUseCase
  ) {}

  async handle(
    request: ListAllCarBrandsController.Request
  ): Promise<ListAllCarBrandsController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const { sort_by, order_by, limit, offset } = request.query;

      const output = await this.listAllCarBrandsUseCase.execute({
        sort_by,
        order_by,
        limit,
        offset,
      });

      return ok(CarBrandMapper.toBrandsDTO(output));
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace ListAllCarBrandsController {
  export type SortBy = IListAllCarBrandsUseCase.SortBy;
  export type OrderBy = IListAllCarBrandsUseCase.OrderBy;
  export type Limit = IListAllCarBrandsUseCase.Limit;
  export type Offset = IListAllCarBrandsUseCase.Offset;

  export type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllCarBrandsController };
