import { faker } from '@faker-js/faker';

import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/UpdateCarSpecification';

export const updateCarSpecificationUseCaseInputMock: IUpdateCarSpecificationUseCase.Input =
  {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
  };
