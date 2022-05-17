interface ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository {
  checkIfSomeExistsByIdsFromCar(
    data: ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository.Input
  ): Promise<ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository.Output>;
}

namespace ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository {
  export type Input = {
    car_id: string;
    specifications_ids: string[];
  };

  export type Output = boolean;
}

export { ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository };
