import { faker } from '@faker-js/faker';

import { ICreateCarCategoryUseCase } from '@domain/usecases/car/category/CreateCarCategory';

export const createCarCategoryUseCaseInputMock: ICreateCarCategoryUseCase.Input =
  {
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
