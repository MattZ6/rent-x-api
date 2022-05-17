interface IAddSpecificationsToCarUseCase {
  execute(
    data: IAddSpecificationsToCarUseCase.Input
  ): Promise<IAddSpecificationsToCarUseCase.Output>;
}

namespace IAddSpecificationsToCarUseCase {
  export type Input = {
    car_id: string;
    specifications_ids: string[];
  };

  export type Output = void;
}

export { IAddSpecificationsToCarUseCase };
