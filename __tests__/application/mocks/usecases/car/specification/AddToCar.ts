import { faker } from '@faker-js/faker';

import { IAddSpecificationsToCarUseCase } from '@domain/usecases/car/specification/AddToCar';

export function makeAddSpecificationsToCarUseCaseInputMock(): IAddSpecificationsToCarUseCase.Input {
  return {
    car_id: faker.datatype.uuid(),
    specifications_ids: faker.helpers.arrayElements([
      faker.datatype.uuid(),
      faker.datatype.uuid(),
      faker.datatype.uuid(),
    ]),
  };
}
