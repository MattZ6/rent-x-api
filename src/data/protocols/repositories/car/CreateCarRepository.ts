import { ICar } from '@domain/models/Car';

interface ICreateCarRepository {
  create(
    data: ICreateCarRepository.Input
  ): Promise<ICreateCarRepository.Output>;
}

namespace ICreateCarRepository {
  export type Input = Omit<
    ICar,
    'id' | 'created_at' | 'updated_at' | 'category' | 'brand'
  >;

  export type Output = ICar;
}

export { ICreateCarRepository };
