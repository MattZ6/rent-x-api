interface ICheckIfRentExistsByScheduleForCarRepository {
  checkIfExistsByScheduleForCar(
    data: ICheckIfRentExistsByScheduleForCarRepository.Input
  ): Promise<ICheckIfRentExistsByScheduleForCarRepository.Output>;
}

namespace ICheckIfRentExistsByScheduleForCarRepository {
  export type Input = {
    car_id: string;
    start: Date;
    end: Date;
  };

  export type Output = boolean;
}

export { ICheckIfRentExistsByScheduleForCarRepository };
