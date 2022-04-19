import { faker } from '@faker-js/faker';

import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

export function makeReturnRentUseCaseInputMock(): IReturnRentUseCase.Input {
  return {
    rent_id: faker.datatype.uuid(),
    user_id: faker.datatype.uuid(),
  };
}
