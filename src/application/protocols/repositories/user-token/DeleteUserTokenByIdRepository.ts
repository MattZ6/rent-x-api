interface IDeleteUserTokenByIdRepository {
  deleteById(
    data: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output>;
}

namespace IDeleteUserTokenByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = void;
}

export { IDeleteUserTokenByIdRepository };
