import { faker } from '@faker-js/faker';

import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/Create';

export function makeCreateCarCategoryUseCaseInputMock(): ICreateCarCategoryUseCase.Input {
  return {
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
}
