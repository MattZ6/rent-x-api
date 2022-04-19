import { faker } from '@faker-js/faker';

import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

export function makeUpdateCarBrandUseCaseInputMock(): IUpdateCarBrandUseCase.Input {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
  };
}
