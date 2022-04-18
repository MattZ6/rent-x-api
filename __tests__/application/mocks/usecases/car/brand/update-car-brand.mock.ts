import { faker } from '@faker-js/faker';

import { IUpdateCarBrandUseCase } from '@domain/usecases/car/brand/Update';

export const updateCarBrandUseCaseInputMock: IUpdateCarBrandUseCase.Input = {
  id: faker.datatype.uuid(),
  name: faker.datatype.string(),
};
