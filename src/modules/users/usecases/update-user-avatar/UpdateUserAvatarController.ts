import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, file } = request;

    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatar.execute({
      user_id,
      file_name: file.filename,
    });

    return response.status(204).send();
  }
}
