import faker from 'faker';

import { ICreateCarBrandUseCase } from '@domain/usecases/car/brand/CreateCarBrand';

export const createCarBrandUseCaseInputMock: ICreateCarBrandUseCase.Input = {
  name: faker.datatype.string(),
};
