interface ICheckIfCarCategoryExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarCategoryExistsByIdRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByIdRepository.Output>;
}

namespace ICheckIfCarCategoryExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarCategoryExistsByIdRepository };
