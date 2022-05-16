import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateAvatar';

import { noContent, notFound } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class UpdateUserAvatarController implements IController {
  constructor(
    private readonly updateUserAvatarUseCase: IUpdateUserAvatarUseCase
  ) {}

  async handle(
    request: UpdateUserAvatarController.Request
  ): Promise<UpdateUserAvatarController.Response> {
    try {
      const { id: userId } = request.user;
      const { file } = request;

      await this.updateUserAvatarUseCase.execute({
        user_id: userId,
        file: {
          name: file.name,
          type: file.mimetype,
          extension: String(file.name.split('.').pop()),
          size: file.size,
          content: file.buffer,
        },
      });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace UpdateUserAvatarController {
  export type Request = IHttpRequest<void, void, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateUserAvatarController };
