import { CarCategoryAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarCategoryUseCase } from '@application/usecases/car/category/Create';

import { makeCarCategoryMock, makeErrorMock } from '../../../../domain';
import {
  CheckIfCarCategoryExistsByNameRepositorySpy,
  CreateCarCategoryRepositorySpy,
  makeCreateCarCategoryUseCaseInputMock,
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

    const input = makeCreateCarCategoryUseCaseInputMock();

    await createCarCategoryUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name: input.name });
  });

  it('should throw if CheckIfCarCategoryExistsByNameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarCategoryUseCaseInputMock();

    const promise = createCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarCategoryAlreadyExistsWithProvidedNameError if CheckIfCarCategoryExistsByNameRepository returns true', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const input = makeCreateCarCategoryUseCaseInputMock();

    const promise = createCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryAlreadyExistsWithProvidedNameError
    );
  });

  it('should call CreateCarCategoryRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarCategoryRepositorySpy, 'create');

    const input = makeCreateCarCategoryUseCaseInputMock();

    await createCarCategoryUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: input.name,
      description: input.description,
    });
  });

  it('should throw if CreateCarCategoryRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarCategoryRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarCategoryUseCaseInputMock();

    const promise = createCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return a new CarCategory on success', async () => {
    const carCategoryMock = makeCarCategoryMock();

    jest
      .spyOn(createCarCategoryRepositorySpy, 'create')
      .mockResolvedValueOnce(carCategoryMock);

    const input = makeCreateCarCategoryUseCaseInputMock();

    const output = await createCarCategoryUseCase.execute(input);

    expect(output).toEqual(carCategoryMock);
  });
});
