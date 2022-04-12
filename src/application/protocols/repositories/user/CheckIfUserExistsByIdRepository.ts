interface ICheckIfUserExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfUserExistsByIdRepository.Input
  ): Promise<ICheckIfUserExistsByIdRepository.Output>;
}

namespace ICheckIfUserExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

export { ICheckIfUserExistsByIdRepository };
