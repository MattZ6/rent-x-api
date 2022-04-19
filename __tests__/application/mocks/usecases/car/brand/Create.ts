import { faker } from '@faker-js/faker';

import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/Create';

export function makeCreateCarBrandUseCaseInputMock(): ICreateCarBrandUseCase.Input {
  return {
    name: faker.datatype.string(),
  };
}
