import dayjs from 'dayjs';

import { InMemoryRentsRepository } from '@modules/rents/repositories/in-memory/InMemoryRentsRepository';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentUseCase } from './CreateRentUseCase';

let inMemoryRentsRepository: InMemoryRentsRepository;
let dayjsDateProvider: DayjsDateProvider;

/** SUT (System Under Test) */

let createRentUseCase: CreateRentUseCase;

describe('CreateRentUseCase', () => {
  const dayPlus24Hours = dayjs().add(24, 'hours').toDate();

  beforeEach(() => {
    inMemoryRentsRepository = new InMemoryRentsRepository();
    dayjsDateProvider = new DayjsDateProvider();

    createRentUseCase = new CreateRentUseCase(
      inMemoryRentsRepository,
      dayjsDateProvider
    );
  });

  it('should not be able to create a rent for a car with a rent in progress for the same date', async () => {
    await createRentUseCase.execute({
      user_id: 'user_id',
      car_id: 'car_id',
      expected_return_date: dayPlus24Hours,
    });

    const promise = createRentUseCase.execute({
      user_id: 'another_user_id',
      car_id: 'car_id',
      expected_return_date: dayPlus24Hours,
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent for a user with a rent in progress', async () => {
    await createRentUseCase.execute({
      user_id: 'user_id',
      car_id: 'car_id',
      expected_return_date: dayPlus24Hours,
    });

    const promise = createRentUseCase.execute({
      user_id: 'user_id',
      car_id: 'another_car_id',
      expected_return_date: dayPlus24Hours,
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent with invalid date', async () => {
    const date = dayjs().subtract(1, 'seconds').toDate();

    const promise = createRentUseCase.execute({
      user_id: 'user_id',
      car_id: 'car_id',
      expected_return_date: date,
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new rent for a car', async () => {
    const rent = await createRentUseCase.execute({
      car_id: 'car_id',
      user_id: 'user_id',
      expected_return_date: dayPlus24Hours,
    });

    expect(rent).toHaveProperty('id');
    expect(rent).toHaveProperty('start_date');
  });
});
