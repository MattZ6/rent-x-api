import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';
import { IListAllUserRentalsUseCase } from '@domain/usecases/rent/user/ListAll';

import { ValidationError } from '@presentation/errors';
import { badRequest, notFound, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class ListAllUserRentalsController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly listAllUserRentalsUseCase: IListAllUserRentalsUseCase
  ) {}

  async handle(
    request: ListAllUserRentalsController.Request
  ): Promise<ListAllUserRentalsController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const { id: user_id } = request.user;
      const { limit, offset } = request.query;

      const output = await this.listAllUserRentalsUseCase.execute({
        user_id,
        limit,
        offset,
      });

      return ok(output);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace ListAllUserRentalsController {
  export type Limit = IListAllCarsUseCase.Limit;
  export type Offset = IListAllCarsUseCase.Offset;

  export type RequestQuery = {
    limit?: Limit;
    offset?: Offset;
  };

  export type Request = IHttpRequest<void, void, RequestQuery, void>;

  export type Response = IHttpResponse;
}

export { ListAllUserRentalsController };
