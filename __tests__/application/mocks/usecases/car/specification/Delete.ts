import { faker } from '@faker-js/faker';

import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/Delete';

export function makeDeleteCarSpecificationUseCaseInputMock(): IDeleteCarSpecificationUseCase.Input {
  return {
    id: faker.datatype.uuid(),
  };
}
