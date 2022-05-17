interface ICheckIfCarSpecificationExistsByIdFromCarRepository {
  checkIfExistsByIdFromCar(
    data: ICheckIfCarSpecificationExistsByIdFromCarRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdFromCarRepository.Output>;
}

namespace ICheckIfCarSpecificationExistsByIdFromCarRepository {
  export type Input = {
    car_id: string;
    specification_id: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarSpecificationExistsByIdFromCarRepository };
