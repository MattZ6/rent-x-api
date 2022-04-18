import { faker } from '@faker-js/faker';

import { CarBrandAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarBrandUseCase } from '@application/usecases/car/brand/Create';

import {
  CheckIfCarBrandExistsByNameRepositorySpy,
  CreateCarBrandRepositorySpy,
  createCarBrandUseCaseInputMock,
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
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name });
  });

  it('should throw if CheckIfCarBrandExistsByNameRepository throws', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(new Error());

    const promise = createCarBrandUseCase.execute(
      createCarBrandUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarBrandAlreadyExistsWithThisNameError if already exists a car brand with same name', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const promise = createCarBrandUseCase.execute(
      createCarBrandUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandAlreadyExistsWithProvidedNameError
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

    const promise = createCarBrandUseCase.execute(
      createCarBrandUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should create a car brand', async () => {
    const brand = await createCarBrandUseCase.execute(
      createCarBrandUseCaseInputMock
    );

    expect(brand).toHaveProperty('id');
    expect(brand).toHaveProperty('name', createCarBrandUseCaseInputMock.name);
    expect(brand).toHaveProperty('created_at');
    expect(brand).toHaveProperty('updated_at');
  });
});
