import { Rent } from '@domain/entities/Rent';

interface IFindAllRentsFromUserRepository {
  findAllFromUser(
    data: IFindAllRentsFromUserRepository.Input
  ): Promise<IFindAllRentsFromUserRepository.Output>;
}

namespace IFindAllRentsFromUserRepository {
  export type Take = number;
  export type Skip = number;

  export type Input = {
    user_id: string;
    take: Take;
    skip: Skip;
    include?: {
      cars?: boolean;
    };
  };

  export type Output = Rent[];
}

export { IFindAllRentsFromUserRepository };
