import { faker } from '@faker-js/faker';

import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/Create';

export const createCarBrandUseCaseInputMock: ICreateCarBrandUseCase.Input = {
  name: faker.datatype.string(),
};
