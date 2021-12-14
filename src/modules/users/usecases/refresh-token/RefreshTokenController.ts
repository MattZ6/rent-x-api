import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token =
      request.body.refresh_token ||
      request.headers['x-refresh_token'] ||
      request.query.refresh_token;

    const refreshToken = container.resolve(RefreshTokenUseCase);

    const data = await refreshToken.execute({ refresh_token });

    return response.json(data);
  }
}
