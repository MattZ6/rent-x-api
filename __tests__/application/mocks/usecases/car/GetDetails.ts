import { faker } from '@faker-js/faker';

import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

export function makeGetCarDetailsUseCaseInputMock(): IGetCarDetailsUseCase.Input {
  return {
    id: faker.datatype.uuid(),
  };
}
