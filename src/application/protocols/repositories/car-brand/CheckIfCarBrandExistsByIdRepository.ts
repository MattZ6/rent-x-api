interface ICheckIfCarBrandExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarBrandExistsByIdRepository.Input
  ): Promise<ICheckIfCarBrandExistsByIdRepository.Output>;
}

namespace ICheckIfCarBrandExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarBrandExistsByIdRepository };
