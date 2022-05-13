import { Request, Response } from 'express';

import { HttpRequestFile } from '@presentation/protocols';
import { IController } from '@presentation/protocols/Controller';

export function adaptRoute(controller: IController) {
  return async (request: Request, response: Response): Promise<Response> => {
    let file: HttpRequestFile;

    if (request.file) {
      file = {
        buffer: request.file.buffer,
        mimetype: request.file.mimetype,
        name: request.file.originalname,
        size: request.file.size,
      };
    }

    let files: HttpRequestFile[] = [];

    if (request.files) {
      files = (request.files as Express.Multer.File[]).map(f => ({
        buffer: f.buffer,
        mimetype: f.mimetype,
        name: f.originalname,
        size: f.size,
      }));
    }

    const { statusCode, body } = await controller.handle({
      body: request.body ?? {},
      params: request.params ?? {},
      query: request.query ?? {},
      headers: request.headers ?? {},
      user: request.user,
      original_url: request.originalUrl,
      method: request.method,
      file,
      files,
    });

    return response.status(statusCode).json(body);
  };
}
