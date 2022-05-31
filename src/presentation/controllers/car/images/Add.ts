import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IAddImagesToCarUseCase } from '@domain/usecases/car/image/Add';

import { ValidationError } from '@presentation/errors';
import { badRequest, created, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';

class AddImagesToCarController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addImagesToCarUseCase: IAddImagesToCarUseCase
  ) {}

  async handle(
    request: AddImagesToCarController.Request
  ): Promise<AddImagesToCarController.Response> {
    try {
      const validationError = this.validation.validate({
        ...request.params,
        files: request.files,
      });

      if (validationError) {
        throw validationError;
      }

      const { car_id } = request.params;
      const { files } = request;

      await this.addImagesToCarUseCase.execute({
        car_id,
        files: files.map(file => ({
          name: file.name,
          type: file.mimetype,
          extension: String(file.name.split('.').pop()),
          size: file.size,
          content: file.buffer,
        })),
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof CarNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace AddImagesToCarController {
  export type RequestParams = {
    car_id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { AddImagesToCarController };
