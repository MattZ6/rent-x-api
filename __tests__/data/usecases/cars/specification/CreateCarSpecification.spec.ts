import faker from 'faker';

import { CarSpecificationAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarSpecificationUseCase } from '@data/usecases/car/specification/CreateCarSpecification';

import {
  CheckIfCarSpecificationExistsByNameRepositorySpy,
  CreateCarSpecificationRepositorySpy,
  createCarSpecificationUseCaseInputMock,
} from '../../../mocks';

let checkIfCarSpecificationExistsByNameRepositorySpy: CheckIfCarSpecificationExistsByNameRepositorySpy;
let createCarSpecificationRepositorySpy: CreateCarSpecificationRepositorySpy;

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('CreateCarSpecificationUseCase', () => {
  beforeEach(() => {
    checkIfCarSpecificationExistsByNameRepositorySpy =
      new CheckIfCarSpecificationExistsByNameRepositorySpy();
    createCarSpecificationRepositorySpy =
      new CreateCarSpecificationRepositorySpy();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      createCarSpecificationRepositorySpy
    );
  });

  it('should call CheckIfCarSpecificationExistsByNameRepository once with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const name = faker.datatype.string();

    await createCarSpecificationUseCase.execute({
      ...createCarSpecificationUseCaseInputMock,
      name,
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name });
  });

  it('should throw if CheckIfCarSpecificationExistsByNameRepository throws', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockRejectedValueOnce(new Error());

    const promise = createCarSpecificationUseCase.execute(
      createCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarSpecificationAlreadyExistsWithThisNameError if already exists a car specification with same name', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockResolvedValueOnce(true);

    const promise = createCarSpecificationUseCase.execute(
      createCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationAlreadyExistsWithThisNameError
    );
  });

  it('should call CreateCarSpecificationRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarSpecificationRepositorySpy, 'create');

    const name = faker.datatype.string();
    const description = faker.datatype.string();

    await createCarSpecificationUseCase.execute({
      name,
      description,
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name,
      description,
    });
  });

  it('should throw if CreateCarSpecificationRepository throws', async () => {
    jest
      .spyOn(createCarSpecificationRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createCarSpecificationUseCase.execute(
      createCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should create a car specification', async () => {
    const specification = await createCarSpecificationUseCase.execute(
      createCarSpecificationUseCaseInputMock
    );

    expect(specification).toHaveProperty('id');
    expect(specification).toHaveProperty(
      'name',
      createCarSpecificationUseCaseInputMock.name
    );
    expect(specification).toHaveProperty(
      'description',
      createCarSpecificationUseCaseInputMock.description
    );
    expect(specification).toHaveProperty('created_at');
    expect(specification).toHaveProperty('updated_at');
  });
});
