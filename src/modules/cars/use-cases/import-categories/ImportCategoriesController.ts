import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

export class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);

    await importCategoriesUseCase.execute(file);

    return response.json();
  }
}
