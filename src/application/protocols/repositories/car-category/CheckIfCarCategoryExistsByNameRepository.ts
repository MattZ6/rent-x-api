interface ICheckIfCarCategoryExistsByNameRepository {
  checkIfExistsByName(
    data: ICheckIfCarCategoryExistsByNameRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByNameRepository.Output>;
}

namespace ICheckIfCarCategoryExistsByNameRepository {
  export type Input = {
    name: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarCategoryExistsByNameRepository };
