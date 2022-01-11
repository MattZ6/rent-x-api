import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

/** SUT (System Under Test) */
let createCarUseCase: CreateCarUseCase;

let inMemoryCarsRepository: InMemoryCarsRepository;

describe('CreateCarUseCase', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();

    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'XXX0000',
      daily_late_fee: 80,
      brand: 'Car brand',
      category_id: 'category_1',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with license plate from an existing one', async () => {
    const licensePlate = 'XXX0000';

    await inMemoryCarsRepository.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: licensePlate,
      daily_late_fee: 80,
      brand: 'Car brand',
      category_id: 'category_1',
      is_available: true,
    });

    const promise = createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: licensePlate,
      daily_late_fee: 80,
      brand: 'Car brand',
      category_id: 'category_1',
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with property is_available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'XXX0000',
      daily_late_fee: 80,
      brand: 'Car brand',
      category_id: 'category_1',
    });

    expect(car.is_available).toBe(true);
  });
});
