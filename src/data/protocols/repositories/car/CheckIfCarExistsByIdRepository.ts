interface ICheckIfCarExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarExistsByIdRepository.Input
  ): Promise<ICheckIfCarExistsByIdRepository.Output>;
}

namespace ICheckIfCarExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarExistsByIdRepository };
