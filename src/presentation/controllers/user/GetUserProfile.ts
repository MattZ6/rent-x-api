import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

import { notFound, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
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
      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace GetUserProfileController {
  export type Request = IHttpRequest<void, void, void>;

  export type Response = IHttpResponse;
}

export { GetUserProfileController };
