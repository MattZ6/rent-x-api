import { CarNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetCarScheduleUseCase } from '@domain/usecases/rent/car/GetSchedule';

import { ICheckIfCarExistsByIdRepository } from '@application/protocols/repositories/car';
import { IFindAllRentsFromCarRepository } from '@application/protocols/repositories/rent';

export class GetCarScheduleUseCase implements IGetCarScheduleUseCase {
  constructor(
    private readonly checkIfCarExistsByIdRepository: ICheckIfCarExistsByIdRepository,
    private readonly findAllRentsFromCarRepository: IFindAllRentsFromCarRepository
  ) {}

  async execute(
    data: IGetCarScheduleUseCase.Input
  ): Promise<IGetCarScheduleUseCase.Output> {
    const { car_id } = data;

    const carExists =
      await this.checkIfCarExistsByIdRepository.checkIfExistsById({
        id: car_id,
      });

    if (!carExists) {
      throw new CarNotFoundWithProvidedIdError();
    }

    const now = new Date(Date.now());

    const start = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );

    const rents = await this.findAllRentsFromCarRepository.findAllFromCar({
      car_id,
      start,
    });

    return rents;
  }
}
