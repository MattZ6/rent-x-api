import {
  CarBrandNotFoundWithProvidedIdError,
  CarBrandAlreadyExistsWithProvidedNameError,
} from '@domain/errors';

import { UpdateCarBrandUseCase } from '@application/usecases/car/brand/Update';

import { makeCarBrandMock, makeErrorMock } from '../../../../domain';
import {
  FindCarBrandByIdRepositorySpy,
  CheckIfCarBrandExistsByNameRepositorySpy,
  UpdateCarBrandRepositorySpy,
  makeUpdateCarBrandUseCaseInputMock,
} from '../../../mocks';

let findCarBrandByIdRepositorySpy: FindCarBrandByIdRepositorySpy;
let checkIfCarBrandExistsByNameRepositorySpy: CheckIfCarBrandExistsByNameRepositorySpy;
let updateCarBrandRepositorySpy: UpdateCarBrandRepositorySpy;

let updateCarBrandUseCase: UpdateCarBrandUseCase;

describe('UpdateCarBrandUseCase', () => {
  beforeEach(() => {
    findCarBrandByIdRepositorySpy = new FindCarBrandByIdRepositorySpy();
    checkIfCarBrandExistsByNameRepositorySpy =
      new CheckIfCarBrandExistsByNameRepositorySpy();
    updateCarBrandRepositorySpy = new UpdateCarBrandRepositorySpy();

    updateCarBrandUseCase = new UpdateCarBrandUseCase(
      findCarBrandByIdRepositorySpy,
      checkIfCarBrandExistsByNameRepositorySpy,
      updateCarBrandRepositorySpy
    );
  });

  it('should call FindCarBrandByIdRepository with correct values', async () => {
    const findByIdSpy = jest.spyOn(findCarBrandByIdRepositorySpy, 'findById');

    const input = makeUpdateCarBrandUseCaseInputMock();

    await updateCarBrandUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.id });
  });

  it('should throw if FindCarBrandByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarBrandUseCaseInputMock();

    const promise = updateCarBrandUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarBrandNotFoundWithProvidedIdError if FindCarBrandByIdRepository returns null', async () => {
    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeUpdateCarBrandUseCaseInputMock();

    const promise = updateCarBrandUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandNotFoundWithProvidedIdError
    );
  });

  it('should not call CheckIfCarBrandExistsByNameRepository if brand name not changed', async () => {
    const carBrandMock = makeCarBrandMock();

    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carBrandMock);

    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarBrandUseCaseInputMock();

    input.name = `    ${carBrandMock.name.toUpperCase()}   `;

    await updateCarBrandUseCase.execute(input);

    expect(checkIfExistsByNameSpy).not.toHaveBeenCalled();
  });

  it('should call CheckIfCarBrandExistsByNameRepository once only if brand name has changed', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarBrandUseCaseInputMock();

    await updateCarBrandUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CheckIfCarBrandExistsByNameRepository with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarBrandUseCaseInputMock();

    await updateCarBrandUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name: input.name });
  });

  it('should throw if CheckIfCarBrandExistsByNameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarBrandUseCaseInputMock();

    const promise = updateCarBrandUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarBrandAlreadyExistsWithProvidedNameError if CheckIfCarBrandExistsByNameRepository returns true', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const input = makeUpdateCarBrandUseCaseInputMock();

    const promise = updateCarBrandUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandAlreadyExistsWithProvidedNameError
    );
  });

  it('should call UpdateCarBrandRepository once with correct values only if name has changed', async () => {
    const carBrandMock = makeCarBrandMock();

    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carBrandMock);

    const updateSpy = jest.spyOn(updateCarBrandRepositorySpy, 'update');

    const input = makeUpdateCarBrandUseCaseInputMock();

    input.name = `  ${input.name}   `;

    await updateCarBrandUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: carBrandMock.id,
      name: input.name.trim(),
    });
  });

  it('should throw if UpdateCarBrandRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateCarBrandRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarBrandUseCaseInputMock();

    const promise = updateCarBrandUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the update CarBrand if name has changed', async () => {
    const carBrandMock = makeCarBrandMock();

    jest
      .spyOn(updateCarBrandRepositorySpy, 'update')
      .mockResolvedValueOnce(carBrandMock);

    const input = makeUpdateCarBrandUseCaseInputMock();

    const output = await updateCarBrandUseCase.execute(input);

    expect(output).toEqual(carBrandMock);
  });

  it('should return the existing CarBrand if name has not changed', async () => {
    const carBrandMock = makeCarBrandMock();

    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carBrandMock);

    const input = makeUpdateCarBrandUseCaseInputMock();

    input.name = `   ${carBrandMock.name.toUpperCase()}   `;

    const output = await updateCarBrandUseCase.execute(input);

    expect(output).toEqual(carBrandMock);
  });
});
