import { IGetCarScheduleUseCase } from '@domain/usecases/rent/car/GetSchedule';

import { makeRentMock } from '../../../../../domain';

export function makeGetCarScheduleUseCaseOutputMock(): IGetCarScheduleUseCase.Output {
  return [makeRentMock(), makeRentMock(), makeRentMock()];
}

export class GetCarScheduleUseCaseSpy implements IGetCarScheduleUseCase {
  async execute(
    _: IGetCarScheduleUseCase.Input
  ): Promise<IGetCarScheduleUseCase.Output> {
    return makeGetCarScheduleUseCaseOutputMock();
  }
}
