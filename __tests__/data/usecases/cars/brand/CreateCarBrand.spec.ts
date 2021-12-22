import faker from 'faker';

import { CarBrandAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarBrandUseCase } from '@data/usecases/car/brand/CreateCarBrand';

import {
  CheckIfCarBrandExistsByNameRepositorySpy,
  CreateCarBrandRepositorySpy,
} from '../../../mocks';

let checkIfCarBrandExistsByNameRepositorySpy: CheckIfCarBrandExistsByNameRepositorySpy;
let createCarBrandRepositorySpy: CreateCarBrandRepositorySpy;

let createCarBrandUseCase: CreateCarBrandUseCase;

describe('CreateCarBrandUseCase', () => {
  beforeEach(() => {
    checkIfCarBrandExistsByNameRepositorySpy =
      new CheckIfCarBrandExistsByNameRepositorySpy();
    createCarBrandRepositorySpy = new CreateCarBrandRepositorySpy();

    createCarBrandUseCase = new CreateCarBrandUseCase(
      checkIfCarBrandExistsByNameRepositorySpy,
      createCarBrandRepositorySpy
    );
  });

  it('should call CheckIfCarBrandExistsByNameRepository once with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const name = faker.datatype.string();

    await createCarBrandUseCase.execute({
      name,
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith(name);
  });

  it('should throw if CheckIfCarBrandExistsByNameRepository throws', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(new Error());

    const promise = createCarBrandUseCase.execute({
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarBrandAlreadyExistsWithThisNameError if already exists a car brand with same name', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const promise = createCarBrandUseCase.execute({
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandAlreadyExistsWithThisNameError
    );
  });

  it('should call CreateCarBrandRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarBrandRepositorySpy, 'create');

    const name = faker.datatype.string();

    await createCarBrandUseCase.execute({
      name,
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name,
    });
  });

  it('should throw if CreateCarBrandRepository throws', async () => {
    jest
      .spyOn(createCarBrandRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createCarBrandUseCase.execute({
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should create a car brand', async () => {
    const name = faker.datatype.string();

    const brand = await createCarBrandUseCase.execute({
      name,
    });

    expect(brand).toHaveProperty('id');
    expect(brand).toHaveProperty('name', name);
    expect(brand).toHaveProperty('created_at');
    expect(brand).toHaveProperty('updated_at');
  });
});
