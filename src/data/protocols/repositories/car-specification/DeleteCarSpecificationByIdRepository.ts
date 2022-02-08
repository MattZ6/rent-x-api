interface IDeleteCarSpecificationByIdRepository {
  deleteById(
    data: IDeleteCarSpecificationByIdRepository.Input
  ): Promise<IDeleteCarSpecificationByIdRepository.Output>;
}

namespace IDeleteCarSpecificationByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = void;
}

export { IDeleteCarSpecificationByIdRepository };
