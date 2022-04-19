import { faker } from '@faker-js/faker';

import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/Update';

export function makeUpdateCarSpecificationUseCaseInputMock(): IUpdateCarSpecificationUseCase.Input {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
}
