import {
  CarSpecificationNotFoundWithProvidedIdError,
  CarSpecificationAlreadyExistsWithProvidedNameError,
} from '@domain/errors';

import { UpdateCarSpecificationUseCase } from '@application/usecases/car/specification/Update';

import { makeErrorMock, makeCarSpecificationMock } from '../../../../domain';
import {
  FindCarSpecificationByIdRepositorySpy,
  CheckIfCarSpecificationExistsByNameRepositorySpy,
  UpdateCarSpecificationRepositorySpy,
  makeUpdateCarSpecificationUseCaseInputMock,
} from '../../../mocks';

let findCarSpecificationByIdRepositorySpy: FindCarSpecificationByIdRepositorySpy;
let checkIfCarSpecificationExistsByNameRepositorySpy: CheckIfCarSpecificationExistsByNameRepositorySpy;
let updateCarSpecificationRepositorySpy: UpdateCarSpecificationRepositorySpy;

let updateCarSpecificationUseCase: UpdateCarSpecificationUseCase;

describe('UpdateCarSpecificationUseCase', () => {
  beforeEach(() => {
    findCarSpecificationByIdRepositorySpy =
      new FindCarSpecificationByIdRepositorySpy();
    checkIfCarSpecificationExistsByNameRepositorySpy =
      new CheckIfCarSpecificationExistsByNameRepositorySpy();
    updateCarSpecificationRepositorySpy =
      new UpdateCarSpecificationRepositorySpy();

    updateCarSpecificationUseCase = new UpdateCarSpecificationUseCase(
      findCarSpecificationByIdRepositorySpy,
      checkIfCarSpecificationExistsByNameRepositorySpy,
      updateCarSpecificationRepositorySpy
    );
  });

  it('should call FindCarSpecificationByIdRepository with correct values', async () => {
    const findByIdSpy = jest.spyOn(
      findCarSpecificationByIdRepositorySpy,
      'findById'
    );

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    await updateCarSpecificationUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.id });
  });

  it('should throw if FindCarSpecificationByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    const promise = updateCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarSpecificationNotFoundWithProvidedIdError if FindCarSpecificationByIdRepository returns null', async () => {
    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    const promise = updateCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationNotFoundWithProvidedIdError
    );
  });

  it('should not call CheckIfCarSpecificationExistsByNameRepository if Specification name not changed', async () => {
    const carSpecificationMock = makeCarSpecificationMock();

    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carSpecificationMock);

    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    input.name = `    ${carSpecificationMock.name.toUpperCase()}   `;

    await updateCarSpecificationUseCase.execute(input);

    expect(checkIfExistsByNameSpy).not.toHaveBeenCalled();
  });

  it('should call CheckIfCarSpecificationExistsByNameRepository once only if Specification name has changed', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    await updateCarSpecificationUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CheckIfCarSpecificationExistsByNameRepository with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    await updateCarSpecificationUseCase.execute(input);

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

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    const promise = updateCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarSpecificationAlreadyExistsWithProvidedNameError if CheckIfCarSpecificationExistsByNameRepository returns true', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockResolvedValueOnce(true);

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    const promise = updateCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationAlreadyExistsWithProvidedNameError
    );
  });

  it('should call UpdateCarSpecificationRepository once with correct values', async () => {
    const carSpecificationMock = makeCarSpecificationMock();

    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carSpecificationMock);

    const updateSpy = jest.spyOn(updateCarSpecificationRepositorySpy, 'update');

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    input.name = `  ${input.name}   `;
    input.description = ` ${input.description}  `;

    await updateCarSpecificationUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: carSpecificationMock.id,
      name: input.name.trim(),
      description: input.description.trim(),
    });
  });

  it('should throw if UpdateCarSpecificationRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateCarSpecificationRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    const promise = updateCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the updated CarSpecification on success', async () => {
    const carSpecificationMock = makeCarSpecificationMock();

    jest
      .spyOn(updateCarSpecificationRepositorySpy, 'update')
      .mockResolvedValueOnce(carSpecificationMock);

    const input = makeUpdateCarSpecificationUseCaseInputMock();

    const output = await updateCarSpecificationUseCase.execute(input);

    expect(output).toEqual(carSpecificationMock);
  });
});
