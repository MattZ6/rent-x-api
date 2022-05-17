interface IRemoveCarSpecificationsFromCarRepository {
  removeFromCar(
    data: IRemoveCarSpecificationsFromCarRepository.Input
  ): Promise<IRemoveCarSpecificationsFromCarRepository.Output>;
}

namespace IRemoveCarSpecificationsFromCarRepository {
  export type Input = {
    car_id: string;
    specification_id: string;
  };

  export type Output = void;
}

export { IRemoveCarSpecificationsFromCarRepository };
