import { faker } from '@faker-js/faker';

import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/Create';

export const createCarSpecificationUseCaseInputMock: ICreateCarSpecificationUseCase.Input =
  {
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
