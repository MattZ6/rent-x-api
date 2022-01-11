interface ICheckIfCarSpecificationExistsByNameRepository {
  checkIfExistsByName(
    data: ICheckIfCarSpecificationExistsByNameRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByNameRepository.Output>;
}

namespace ICheckIfCarSpecificationExistsByNameRepository {
  export type Input = {
    name: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarSpecificationExistsByNameRepository };
