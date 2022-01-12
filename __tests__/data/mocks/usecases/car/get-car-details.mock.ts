import faker from 'faker';

import { IGetCarDetailsUseCase } from '@domain/usecases/car/GetCarDetails';

export const getCarDetailsUseCaseInputMock: IGetCarDetailsUseCase.Input = {
  car_id: faker.datatype.uuid(),
};
