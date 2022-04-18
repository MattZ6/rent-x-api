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
      const { user_id } = request;
      const { file } = request.body;

      await this.updateUserAvatarUseCase.execute({
        user_id,
        file: {
          name: file.originalname,
          type: file.mimetype,
          extension: String(file.originalname.split('.').pop()),
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
  type File = {
    originalname: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  };

  type UpdateUserAvatarBodyRequest = {
    file: File;
  };

  export type Request = IHttpRequest<UpdateUserAvatarBodyRequest, void, void>;

  export type Response = IHttpResponse;
}

export { UpdateUserAvatarController };
