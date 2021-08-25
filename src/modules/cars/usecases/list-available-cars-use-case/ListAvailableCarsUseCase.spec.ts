import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let inMemoryCarsRepository: InMemoryCarsRepository;

/** SUT (System Under Test) */
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('ListAvailableCarsUseCase', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it('should be able to list all available cars', async () => {
    const availableCarsToCreate = Array.from({ length: 3 }).map((_, index) => ({
      name: `Car #${index + 1} - Available`,
      description: 'Car description',
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 50,
      fine_amount: 50,
      is_available: true,
      license_plate: `XXX-000${index + 1}`,
    }));

    const [, ...availableCars] = await Promise.all([
      inMemoryCarsRepository.create({
        name: 'Unavailable Car',
        description: 'Car description',
        brand: 'Brand',
        category_id: 'category_id',
        daily_rate: 50,
        fine_amount: 50,
        is_available: false,
        license_plate: 'XXX-9999',
      }),
      ...availableCarsToCreate.map(car => inMemoryCarsRepository.create(car)),
    ]);

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual(availableCars);
  });

  it('should be able to list all available cars find by name', async () => {
    const availableCarsToCreate = Array.from({ length: 3 }).map((_, index) => ({
      name: `Car #${index + 1}`,
      description: 'Car description',
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 50,
      fine_amount: 50,
      is_available: true,
      license_plate: `XXX-000${index + 1}`,
    }));

    const [, ...availableCars] = await Promise.all([
      inMemoryCarsRepository.create({
        name: 'Unavailable Car',
        description: 'Car description',
        brand: 'Brand',
        category_id: 'category_id',
        daily_rate: 50,
        fine_amount: 50,
        is_available: false,
        license_plate: 'XXX-9999',
      }),
      ...availableCarsToCreate.map(car => inMemoryCarsRepository.create(car)),
    ]);

    const cars = await listAvailableCarsUseCase.execute({
      name: 'car',
    });

    expect(cars).toEqual(availableCars);
  });

  it('should be able to list all available cars find by brand', async () => {
    const availableCarsToCreate = Array.from({ length: 3 }).map((_, index) => ({
      name: `Car #${index + 1}`,
      description: 'Car description',
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 50,
      fine_amount: 50,
      is_available: true,
      license_plate: `XXX-000${index + 1}`,
    }));

    const [, ...availableCars] = await Promise.all([
      inMemoryCarsRepository.create({
        name: 'Unavailable Car',
        description: 'Car description',
        brand: 'Brand',
        category_id: 'category_id',
        daily_rate: 50,
        fine_amount: 50,
        is_available: false,
        license_plate: 'XXX-9999',
      }),
      ...availableCarsToCreate.map(car => inMemoryCarsRepository.create(car)),
    ]);

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'bran',
    });

    expect(cars).toEqual(availableCars);
  });

  it('should be able to list all available cars find by category id', async () => {
    const categoryId = 'category_id';

    const availableCarsToCreate = Array.from({ length: 3 }).map((_, index) => ({
      name: `Car #${index + 1}`,
      description: 'Car description',
      brand: 'Brand',
      category_id: categoryId,
      daily_rate: 50,
      fine_amount: 50,
      is_available: true,
      license_plate: `XXX-000${index + 1}`,
    }));

    const [, , ...availableCars] = await Promise.all([
      inMemoryCarsRepository.create({
        name: 'Unavailable Car',
        description: 'Car description',
        brand: 'Brand',
        category_id: categoryId,
        daily_rate: 50,
        fine_amount: 50,
        is_available: false,
        license_plate: 'XXX-9999',
      }),
      inMemoryCarsRepository.create({
        name: 'Available Car',
        description: 'With not found category',
        brand: 'Brand',
        category_id: 'another_category_id',
        daily_rate: 50,
        fine_amount: 50,
        is_available: true,
        license_plate: 'XXX-6661',
      }),
      ...availableCarsToCreate.map(car => inMemoryCarsRepository.create(car)),
    ]);

    const cars = await listAvailableCarsUseCase.execute({
      category_id: categoryId,
    });

    expect(cars).toEqual(availableCars);
  });
});
