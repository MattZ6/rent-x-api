import { ICar } from '@domain/entities/Car';

interface IFindCarByIdRepository {
  findById(
    data: IFindCarByIdRepository.Input
  ): Promise<IFindCarByIdRepository.Output>;
}

namespace IFindCarByIdRepository {
  export type Input = {
    id: string;
    relations?: Array<
      keyof Pick<ICar, 'brand' | 'category' | 'specifications'>
    >;
  };

  export type Output = undefined | ICar;
}

export { IFindCarByIdRepository };
