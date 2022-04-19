import { faker } from '@faker-js/faker';

import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

export function makeUpdateCarCategoryUseCaseInputMock(): IUpdateCarCategoryUseCase.Input {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
}
