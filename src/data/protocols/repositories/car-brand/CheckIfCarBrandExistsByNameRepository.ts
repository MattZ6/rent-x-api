interface ICheckIfCarBrandExistsByNameRepository {
  checkIfExistsByName(
    data: ICheckIfCarBrandExistsByNameRepository.Input
  ): Promise<ICheckIfCarBrandExistsByNameRepository.Output>;
}

namespace ICheckIfCarBrandExistsByNameRepository {
  export type Input = {
    name: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarBrandExistsByNameRepository };
