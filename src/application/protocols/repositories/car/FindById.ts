import { Car } from '@domain/entities/Car';

interface IFindCarByIdRepository {
  findById(
    data: IFindCarByIdRepository.Input
  ): Promise<IFindCarByIdRepository.Output>;
}

namespace IFindCarByIdRepository {
  export type Input = Pick<Car, 'id'> & {
    include?: {
      brand?: boolean;
      category?: boolean;
      specifications?: boolean;
    };
  };

  export type Output = Car | null;
}

export { IFindCarByIdRepository };
