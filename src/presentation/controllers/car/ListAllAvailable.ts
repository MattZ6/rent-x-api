import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';
import { IListAllAvailableCarsUseCase } from '@domain/usecases/car/ListAllAvailable';

import { ValidationError } from '@presentation/errors';
import { badRequest, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ListAllAvailableCarsController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllCarsUseCase: IListAllAvailableCarsUseCase
  ) {}

  async handle(
    request: ListAllAvailableCarsController.Request
  ): Promise<ListAllAvailableCarsController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const {
        sort_by,
        order_by,
        limit,
        offset,
        brand_id,
        category_id,
        search,
        min_daily_rate,
        max_daily_rate,
        start_date,
        end_date,
        type_of_fuel,
        transmission_type,
      } = request.query;

      const output = await this.listAllCarsUseCase.execute({
        sort_by,
        order_by,
        limit,
        offset,
        brand_id,
        category_id,
        search,
        min_daily_rate,
        max_daily_rate,
        start_date,
        end_date,
        type_of_fuel,
        transmission_type,
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

namespace ListAllAvailableCarsController {
  export type SortBy = IListAllAvailableCarsUseCase.SortBy;
  export type OrderBy = IListAllAvailableCarsUseCase.OrderBy;
  export type Limit = IListAllAvailableCarsUseCase.Limit;
  export type Offset = IListAllAvailableCarsUseCase.Offset;

  export type RequestQuery = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    limit?: Limit;
    offset?: Offset;
    brand_id?: string;
    category_id?: string;
    type_of_fuel?: CarTypeOfFuelEnum;
    transmission_type?: CarTransmissionTypeEnum;
    min_daily_rate?: number;
    max_daily_rate?: number;
    search?: string;
    start_date?: Date;
    end_date?: Date;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllAvailableCarsController };
