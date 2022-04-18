import { ICar } from '@domain/entities/Car';

interface ICreateCarUseCase {
  execute(data: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output>;
}

namespace ICreateCarUseCase {
  export type Input = Omit<
    ICar,
    'id' | 'specifications' | 'brand' | 'category' | 'created_at' | 'updated_at'
  > & {
    specifications_ids?: string[];
  };

  export type Output = ICar;
}

export { ICreateCarUseCase };
