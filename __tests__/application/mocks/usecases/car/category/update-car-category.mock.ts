import { faker } from '@faker-js/faker';

import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/Update';

export const updateCarCategoryUseCaseInputMock: IUpdateCarCategoryUseCase.Input =
  {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
