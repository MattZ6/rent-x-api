import dayjs from 'dayjs';

import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemoryRentsRepository } from '@modules/rents/repositories/in-memory/InMemoryRentsRepository';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentUseCase } from './CreateRentUseCase';

let inMemoryRentsRepository: InMemoryRentsRepository;
let dayjsDateProvider: DayjsDateProvider;
let inMemoryCarsRepository: InMemoryCarsRepository;

/** SUT (System Under Test) */

let createRentUseCase: CreateRentUseCase;

describe('CreateRentUseCase', () => {
  const dayPlus24Hours = dayjs().add(24, 'hours').toDate();

  beforeEach(() => {
    inMemoryRentsRepository = new InMemoryRentsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    inMemoryCarsRepository = new InMemoryCarsRepository();

    createRentUseCase = new CreateRentUseCase(
      inMemoryRentsRepository,
      dayjsDateProvider,
      inMemoryCarsRepository
    );
  });

  it('should not be able to create a rent for a car with a rent in progress for the same date', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'any-name',
      description: 'any-description',
      brand: 'any-brand',
      category_id: 'any-category-id',
      daily_rate: 1,
      daily_late_fee: 10,
      is_available: true,
      license_plate: 'any-plate',
    });

    await createRentUseCase.execute({
      user_id: 'user_id',
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    const promise = createRentUseCase.execute({
      user_id: 'another_user_id',
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rent for a user with a rent in progress', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'any-name',
      description: 'any-description',
      brand: 'any-brand',
      category_id: 'any-category-id',
      daily_rate: 1,
      daily_late_fee: 10,
      is_available: true,
      license_plate: 'any-plate',
    });

    await createRentUseCase.execute({
      user_id: 'user_id',
      car_id: car.id,
      expected_return_date: dayPlus24Hours,
    });

    const promise = createRentUseCase.execute({
      user_id: 'user_id',
      car_id: car.id,
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
    const car = await inMemoryCarsRepository.create({
      name: 'any-name',
      description: 'any-description',
      brand: 'any-brand',
      category_id: 'any-category-id',
      daily_rate: 1,
      daily_late_fee: 10,
      is_available: true,
      license_plate: 'any-plate',
    });

    const rent = await createRentUseCase.execute({
      car_id: car.id,
      user_id: 'user_id',
      expected_return_date: dayPlus24Hours,
    });

    expect(rent).toHaveProperty('id');
    expect(rent).toHaveProperty('start_date');
  });
});
