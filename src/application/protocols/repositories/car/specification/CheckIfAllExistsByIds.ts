interface ICheckIfAllCarSpecificationsExistsByIdsRepository {
  checkIfAllExistsByIds(
    data: ICheckIfAllCarSpecificationsExistsByIdsRepository.Input
  ): Promise<ICheckIfAllCarSpecificationsExistsByIdsRepository.Output>;
}

namespace ICheckIfAllCarSpecificationsExistsByIdsRepository {
  export type Input = {
    ids: string[];
  };

  export type Output = boolean;
}

export { ICheckIfAllCarSpecificationsExistsByIdsRepository };
