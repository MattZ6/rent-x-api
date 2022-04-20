import { CarBrandAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarBrandUseCase } from '@application/usecases/car/brand/Create';

import { makeCarBrandMock, makeErrorMock } from '../../../../domain';
import {
  CheckIfCarBrandExistsByNameRepositorySpy,
  CreateCarBrandRepositorySpy,
  makeCreateCarBrandUseCaseInputMock,
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

    const input = makeCreateCarBrandUseCaseInputMock();

    await createCarBrandUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name: input.name });
  });

  it('should throw if CheckIfCarBrandExistsByNameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarBrandUseCaseInputMock();

    const promise = createCarBrandUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarBrandAlreadyExistsWithProvidedNameError if CheckIfCarBrandExistsByNameRepository returns true', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const input = makeCreateCarBrandUseCaseInputMock();

    const promise = createCarBrandUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandAlreadyExistsWithProvidedNameError
    );
  });

  it('should call CreateCarBrandRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarBrandRepositorySpy, 'create');

    const input = makeCreateCarBrandUseCaseInputMock();

    await createCarBrandUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ name: input.name });
  });

  it('should throw if CreateCarBrandRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarBrandRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarBrandUseCaseInputMock();

    const promise = createCarBrandUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return a new CarBrand on success', async () => {
    const carBrandMock = makeCarBrandMock();

    jest
      .spyOn(createCarBrandRepositorySpy, 'create')
      .mockResolvedValueOnce(carBrandMock);

    const input = makeCreateCarBrandUseCaseInputMock();

    const output = await createCarBrandUseCase.execute(input);

    expect(output).toEqual(carBrandMock);
  });
});
