import faker from 'faker';

import { CarCategoryAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarCategoryUseCase } from '@data/usecases/car/category/CreateCarCategory';

import {
  CheckIfCarCategoryExistsByNameRepositorySpy,
  CreateCarCategoryRepositorySpy,
} from '../../../mocks';

let checkIfCarCategoryExistsByNameRepositorySpy: CheckIfCarCategoryExistsByNameRepositorySpy;
let createCarCategoryRepositorySpy: CreateCarCategoryRepositorySpy;

let createCarCategoryUseCase: CreateCarCategoryUseCase;

describe('CreateCarCategoryUseCase', () => {
  beforeEach(() => {
    checkIfCarCategoryExistsByNameRepositorySpy =
      new CheckIfCarCategoryExistsByNameRepositorySpy();
    createCarCategoryRepositorySpy = new CreateCarCategoryRepositorySpy();

    createCarCategoryUseCase = new CreateCarCategoryUseCase(
      checkIfCarCategoryExistsByNameRepositorySpy,
      createCarCategoryRepositorySpy
    );
  });

  it('should call CheckIfCarCategoryExistsByNameRepository once with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const name = faker.datatype.string();

    await createCarCategoryUseCase.execute({
      name,
      description: faker.datatype.string(),
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith(name);
  });

  it('should throw if CheckIfCarCategoryExistsByNameRepository throws', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(new Error());

    const promise = createCarCategoryUseCase.execute({
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarCategoryAlreadyExistsWithThisNameError if already exists a car category with same name', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const promise = createCarCategoryUseCase.execute({
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryAlreadyExistsWithThisNameError
    );
  });

  it('should call CreateCarCategoryRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarCategoryRepositorySpy, 'create');

    const name = faker.datatype.string();
    const description = faker.datatype.string();

    await createCarCategoryUseCase.execute({
      name,
      description,
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name,
      description,
    });
  });

  it('should throw if CreateCarCategoryRepository throws', async () => {
    jest
      .spyOn(createCarCategoryRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createCarCategoryUseCase.execute({
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should create a car Category', async () => {
    const name = faker.datatype.string();
    const description = faker.datatype.string();

    const Category = await createCarCategoryUseCase.execute({
      name,
      description,
    });

    expect(Category).toHaveProperty('id');
    expect(Category).toHaveProperty('name', name);
    expect(Category).toHaveProperty('description', description);
    expect(Category).toHaveProperty('created_at');
    expect(Category).toHaveProperty('updated_at');
  });
});
