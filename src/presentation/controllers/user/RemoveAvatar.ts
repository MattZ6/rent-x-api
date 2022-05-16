import {
  UserAvatarNotFoundWithProvidedUserIdError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IRemoveUserAvatarUseCase } from '@domain/usecases/user/RemoveAvatar';

import { noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class RemoveUserAvatarController implements IController {
  constructor(
    private readonly removeUserAvatarUseCase: IRemoveUserAvatarUseCase
  ) {}

  async handle(
    request: RemoveUserAvatarController.Request
  ): Promise<RemoveUserAvatarController.Response> {
    try {
      const { id: userId } = request.user;

      await this.removeUserAvatarUseCase.execute({ user_id: userId });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof UserAvatarNotFoundWithProvidedUserIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace RemoveUserAvatarController {
  export type Request = IHttpRequest<void, void, void, void>;

  export type Response = IHttpResponse;
}

export { RemoveUserAvatarController };
