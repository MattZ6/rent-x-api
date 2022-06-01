import { GetCarScheduleUseCase } from '@application/usecases/rent/car/GetSchedule';

import { makeCarsRepository } from '@main/factories/repositories/Car';
import { makeRentsRepository } from '@main/factories/repositories/Rent';

export function makeGetCarScheduleUseCase() {
  const carsRepository = makeCarsRepository();
  const rentsRepository = makeRentsRepository();

  return new GetCarScheduleUseCase(carsRepository, rentsRepository);
}
