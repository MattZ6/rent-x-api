import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository';
import { InMemorySpecificationsRepository } from '@modules/cars/repositories/in-memory/InMemorySpecificationsRepository';

import { AppError } from '@shared/errors/AppError';

import { AddSpecificationsToCarUseCase } from './AddSpecificationsToCarUseCase';

let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationsRepository: InMemorySpecificationsRepository;

let addSpecificationsToCarUseCase: AddSpecificationsToCarUseCase;

describe('AddSpecificationsToCarUseCase', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();

    addSpecificationsToCarUseCase = new AddSpecificationsToCarUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    );
  });

  it('should not be able to add a new specification to a non-existing car', async () => {
    const promise = addSpecificationsToCarUseCase.execute({
      car_id: 'non_existing_car_id',
      specifications_ids: ['specification_1'],
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add non-existing specifications to an existing car', async () => {
    const { id } = await inMemoryCarsRepository.create({
      name: 'Car',
      description: 'Car description',
      brand: 'Brand',
      category_id: 'category_xxx',
      is_available: true,
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'XXX-6661',
    });

    const { id: specification_id } =
      await inMemorySpecificationsRepository.create({
        name: 'Specification 1',
        description: 'Specification 1 description',
      });

    const promise = addSpecificationsToCarUseCase.execute({
      car_id: id,
      specifications_ids: [specification_id, 'non_existing_specification_id'],
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add new specifications to an existing car', async () => {
    const { id } = await inMemoryCarsRepository.create({
      name: 'Car',
      description: 'Car description',
      brand: 'Brand',
      category_id: 'category_xxx',
      is_available: true,
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'XXX-6661',
    });

    const specifications = await Promise.all([
      inMemorySpecificationsRepository.create({
        name: 'Specification 1',
        description: 'Specification 1 description',
      }),
      inMemorySpecificationsRepository.create({
        name: 'Specification 2',
        description: 'Specification 2 description',
      }),
      inMemorySpecificationsRepository.create({
        name: 'Specification 3',
        description: 'Specification 3 description',
      }),
    ]);

    const car = await addSpecificationsToCarUseCase.execute({
      car_id: id,
      specifications_ids: specifications.map(spec => spec.id),
    });

    expect(car.specifictions).toEqual(
      expect.arrayContaining(
        specifications.map(spec => expect.objectContaining({ id: spec.id }))
      )
    );
  });
});
