interface IRemoveSpecificationFromCarUseCase {
  execute(
    data: IRemoveSpecificationFromCarUseCase.Input
  ): Promise<IRemoveSpecificationFromCarUseCase.Output>;
}

namespace IRemoveSpecificationFromCarUseCase {
  export type Input = {
    car_id: string;
    specification_id: string;
  };

  export type Output = void;
}

export { IRemoveSpecificationFromCarUseCase };
