import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rent } from '@modules/rents/infra/typeorm/entities/Rent';
import { IRentsRepository } from '@modules/rents/repositories/IRentsRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
// import { IDatabaseTransactionsProvider } from '@shared/infra/typeorm/repositories/IDatabaseTransactionsProvider';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentUseCase {
  private readonly MIN_RENT_DAYS = 1;

  constructor(
    @inject('RentsRepository')
    private readonly rentsRepository: IRentsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider //   @inject('DatabaseTransactionsProvider') //   private readonly databaseTransactionsProvider: IDatabaseTransactionsProvider
  ) {}

  async execute(data: IRequest): Promise<Rent> {
    const { id, user_id } = data;

    const rent = await this.rentsRepository.findById(id);

    if (!rent || rent.user_id !== user_id) {
      throw new AppError('Rental does not exists', 404);
    }

    const car = await this.carsRepository.findById(rent.car_id);

    if (!car) {
      throw new AppError('Car does not exists', 404);
    }

    if (rent.end_date) {
      throw new AppError('This rent is already closed', 422);
    }

    const now = new Date();

    let rentDays = this.dateProvider.getDiffInDays(rent.start_date, now);

    if (rentDays < this.MIN_RENT_DAYS) {
      rentDays = this.MIN_RENT_DAYS;
    }

    const daysOfDelay = this.dateProvider.getDiffInDays(
      now,
      rent.expected_return_date
    );

    let rentTotal = 0;

    if (daysOfDelay > 0) {
      const fine = daysOfDelay * car.fine_amount;
      rentTotal = fine;
    }

    rentTotal += rentDays * car.daily_rate;

    rent.end_date = new Date();
    rent.total = rentTotal;

    // await this.databaseTransactionsProvider.begin();

    // let updatedRent: Rent;

    // try {
    const [response] = await Promise.all([
      this.rentsRepository.update(rent),
      this.carsRepository.updateAvailability({
        id: car.id,
        is_available: true,
      }),
    ]);

    const updatedRent = response;

    // await this.databaseTransactionsProvider.commit();
    // } catch (error) {
    // await this.databaseTransactionsProvider.rollback();

    //   throw error;
    // } finally {
    // await this.databaseTransactionsProvider.dispose();
    // }

    return updatedRent;
  }
}
