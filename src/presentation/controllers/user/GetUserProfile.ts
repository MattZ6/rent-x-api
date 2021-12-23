import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

import { notFound, ok } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '@presentation/protocols';

class GetUserProfileController implements IController {
  constructor(private readonly getUserProfileUseCase: IGetUserProfileUseCase) {}

  async handle(
    request: GetUserProfileController.Request
  ): Promise<GetUserProfileController.Response> {
    try {
      const { user_id } = request;

      const user = await this.getUserProfileUseCase.execute({ user_id });

      return ok(user);
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetUserProfileController {
  export type Request = IHttpRequest;

  export type Response = IHttpRespose;
}

export { GetUserProfileController };