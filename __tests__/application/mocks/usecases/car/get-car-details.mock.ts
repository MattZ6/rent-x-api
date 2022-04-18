import { faker } from '@faker-js/faker';

import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetDetails';

export const getCarDetailsUseCaseInputMock: IGetCarDetailsUseCase.Input = {
  car_id: faker.datatype.uuid(),
};
