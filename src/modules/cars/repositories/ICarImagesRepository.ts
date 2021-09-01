import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICreateCarImageDTO {
  car_id: string;
  name: string;
  mime_type: string;
}

export interface ICarImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>;
}
