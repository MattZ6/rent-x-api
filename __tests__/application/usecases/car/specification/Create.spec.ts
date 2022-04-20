import { CarSpecificationAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarSpecificationUseCase } from '@application/usecases/car/specification/Create';

import { makeCarSpecificationMock, makeErrorMock } from '../../../../domain';
import {
  CheckIfCarSpecificationExistsByNameRepositorySpy,
  CreateCarSpecificationRepositorySpy,
  makeCreateCarSpecificationUseCaseInputMock,
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

    const input = makeCreateCarSpecificationUseCaseInputMock();

    await createCarSpecificationUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name: input.name });
  });

  it('should throw if CheckIfCarSpecificationExistsByNameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarSpecificationUseCaseInputMock();

    const promise = createCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarSpecificationAlreadyExistsWithProvidedNameError if CheckIfCarSpecificationExistsByNameRepository returns true', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockResolvedValueOnce(true);

    const input = makeCreateCarSpecificationUseCaseInputMock();

    const promise = createCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationAlreadyExistsWithProvidedNameError
    );
  });

  it('should call CreateCarSpecificationRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarSpecificationRepositorySpy, 'create');

    const input = makeCreateCarSpecificationUseCaseInputMock();

    await createCarSpecificationUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: input.name,
      description: input.description,
    });
  });

  it('should throw if CreateCarSpecificationRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarSpecificationRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarSpecificationUseCaseInputMock();

    const promise = createCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return a new CarSpecification on success', async () => {
    const carSpecificationMock = makeCarSpecificationMock();

    jest
      .spyOn(createCarSpecificationRepositorySpy, 'create')
      .mockResolvedValueOnce(carSpecificationMock);

    const input = makeCreateCarSpecificationUseCaseInputMock();

    const output = await createCarSpecificationUseCase.execute(input);

    expect(output).toEqual(carSpecificationMock);
  });
});
