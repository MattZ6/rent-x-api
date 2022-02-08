interface ICheckIfRentExistsByOpenScheduleForCarRepository {
  checkIfExistsByOpenScheduleForCar(
    data: ICheckIfRentExistsByOpenScheduleForCarRepository.Input
  ): Promise<ICheckIfRentExistsByOpenScheduleForCarRepository.Output>;
}

namespace ICheckIfRentExistsByOpenScheduleForCarRepository {
  export type Input = {
    car_id: string;
    start: Date;
    end: Date;
  };

  export type Output = boolean;
}

export { ICheckIfRentExistsByOpenScheduleForCarRepository };
