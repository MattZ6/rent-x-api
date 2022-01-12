import faker from 'faker';

import { IUpdateCarCategoryUseCase } from '@domain/usecases/car/category/UpdateCarCategory';

export const updateCarCategoryUseCaseInputMock: IUpdateCarCategoryUseCase.Input =
  {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
