interface IRelateCarSpecificationsToCarRepository {
  relateToCar(
    data: IRelateCarSpecificationsToCarRepository.Input
  ): Promise<IRelateCarSpecificationsToCarRepository.Output>;
}

namespace IRelateCarSpecificationsToCarRepository {
  export type Input = {
    car_id: string;
    specifications_ids: string[];
  };

  export type Output = void;
}

export { IRelateCarSpecificationsToCarRepository };
