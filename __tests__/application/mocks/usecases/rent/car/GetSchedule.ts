import { faker } from '@faker-js/faker';

import { IGetCarScheduleUseCase } from '@domain/usecases/rent/car/GetSchedule';

export function makeGetCarScheduleUseCaseInputMock(): IGetCarScheduleUseCase.Input {
  return {
    car_id: faker.datatype.uuid(),
  };
}
