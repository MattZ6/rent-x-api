import { faker } from '@faker-js/faker';

import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/CreateCarSpecification';

export const createCarSpecificationUseCaseInputMock: ICreateCarSpecificationUseCase.Input =
  {
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
