import { faker } from '@faker-js/faker';

import { IRemoveSpecificationFromCarUseCase } from '@domain/usecases/car/specification/RemoveFromCar';

export function makeRemoveSpecificationFromCarUseCaseInputMock(): IRemoveSpecificationFromCarUseCase.Input {
  return {
    car_id: faker.datatype.uuid(),
    specification_id: faker.datatype.uuid(),
  };
}
