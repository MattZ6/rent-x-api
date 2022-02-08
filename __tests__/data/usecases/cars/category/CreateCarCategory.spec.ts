import { faker } from '@faker-js/faker';

import { CarCategoryAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarCategoryUseCase } from '@data/usecases/car/category/CreateCarCategory';

import {
  CheckIfCarCategoryExistsByNameRepositorySpy,
  CreateCarCategoryRepositorySpy,
  createCarCategoryUseCaseInputMock,
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
      ...createCarCategoryUseCaseInputMock,
      name,
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name });
  });

  it('should throw if CheckIfCarCategoryExistsByNameRepository throws', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(new Error());

    const promise = createCarCategoryUseCase.execute(
      createCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarCategoryAlreadyExistsWithThisNameError if already exists a car category with same name', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const promise = createCarCategoryUseCase.execute(
      createCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryAlreadyExistsWithThisNameError
    );
  });

  it('should call CreateCarCategoryRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarCategoryRepositorySpy, 'create');

    await createCarCategoryUseCase.execute(createCarCategoryUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: createCarCategoryUseCaseInputMock.name,
      description: createCarCategoryUseCaseInputMock.description,
    });
  });

  it('should throw if CreateCarCategoryRepository throws', async () => {
    jest
      .spyOn(createCarCategoryRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createCarCategoryUseCase.execute(
      createCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should create a car category', async () => {
    const category = await createCarCategoryUseCase.execute(
      createCarCategoryUseCaseInputMock
    );

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty(
      'name',
      createCarCategoryUseCaseInputMock.name
    );
    expect(category).toHaveProperty(
      'description',
      createCarCategoryUseCaseInputMock.description
    );
    expect(category).toHaveProperty('created_at');
    expect(category).toHaveProperty('updated_at');
  });
});
