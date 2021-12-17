import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetProfileUseCase } from './GetProfileUseCase';

export class GetProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const getProfile = container.resolve(GetProfileUseCase);

    const data = await getProfile.execute({ user_id });

    return response.json(data);
  }
}
