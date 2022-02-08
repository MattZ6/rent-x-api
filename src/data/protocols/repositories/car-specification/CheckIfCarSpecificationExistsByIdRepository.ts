interface ICheckIfCarSpecificationExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarSpecificationExistsByIdRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdRepository.Output>;
}

namespace ICheckIfCarSpecificationExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarSpecificationExistsByIdRepository };
