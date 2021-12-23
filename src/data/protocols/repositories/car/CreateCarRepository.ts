import { ICar } from '@domain/models/Car';

export type CreateCarDTO = Omit<
  ICar,
  'id' | 'created_at' | 'updated_at' | 'category' | 'brand'
>;

export interface ICreateCarRepository {
  create(data: CreateCarDTO): Promise<ICar>;
}
