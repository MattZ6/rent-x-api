import { Rent } from '@domain/entities/Rent';

interface IListAllUserRentalsUseCase {
  execute(
    data: IListAllUserRentalsUseCase.Input
  ): Promise<IListAllUserRentalsUseCase.Output>;
}

namespace IListAllUserRentalsUseCase {
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    user_id: string;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = Rent[];
}

export { IListAllUserRentalsUseCase };
