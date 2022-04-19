import { faker } from '@faker-js/faker';

import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/specification/Create';

export function makeCreateCarSpecificationUseCaseInputMock(): ICreateCarSpecificationUseCase.Input {
  return {
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
}
