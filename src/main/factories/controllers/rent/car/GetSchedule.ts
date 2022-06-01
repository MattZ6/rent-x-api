import { GetCarScheduleController } from '@presentation/controllers/rent/car/GetSchedule';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeGetCarScheduleUseCase } from '@main/factories/usecases/rent/car/GetSchedule';
import { makeGetCarScheduleControllerValidation } from '@main/factories/validators/controllers/rent/car/GetSchedule';

export function makeGetCarScheduleController(): IController {
  const validation = makeGetCarScheduleControllerValidation();
  const listAllUserRentsUseCase = makeGetCarScheduleUseCase();

  const controller = new GetCarScheduleController(
    validation,
    listAllUserRentsUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
