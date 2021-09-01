import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = (request.files ?? []) as Express.Multer.File[];

    const uploadCarImage = container.resolve(UploadCarImageUseCase);

    await uploadCarImage.execute({
      car_id: id,
      images: images.map(image => ({
        name: image.filename,
        mime_type: image.mimetype,
        path: image.path,
      })),
    });

    return response.status(201).send();
  }
}
