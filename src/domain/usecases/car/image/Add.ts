import { CarImage } from '@domain/entities/CarImage';

interface IAddImagesToCarUseCase {
  execute(
    data: IAddImagesToCarUseCase.Input
  ): Promise<IAddImagesToCarUseCase.Output>;
}

namespace IAddImagesToCarUseCase {
  export type UploadedFile = {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: Buffer;
  };

  export type Input = {
    car_id: string;
    files: UploadedFile[];
  };

  export type Output = CarImage[];
}

export { IAddImagesToCarUseCase };
