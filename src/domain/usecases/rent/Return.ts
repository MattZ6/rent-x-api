import { IRent } from '@domain/entities/Rent';

interface IReturnRentUseCase {
  execute(data: IReturnRentUseCase.Input): Promise<IReturnRentUseCase.Output>;
}

namespace IReturnRentUseCase {
  export type Input = {
    user_id: string;
    rent_id: string;
  };

  export type Output = IRent;
}

export { IReturnRentUseCase };
