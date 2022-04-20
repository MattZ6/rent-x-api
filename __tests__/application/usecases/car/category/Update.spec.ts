import {
  CarCategoryNotFoundWithProvidedIdError,
  CarCategoryAlreadyExistsWithProvidedNameError,
} from '@domain/errors';

import { UpdateCarCategoryUseCase } from '@application/usecases/car/category/Update';

import { makeErrorMock, makeCarCategoryMock } from '../../../../domain';
import {
  FindCarCategoryByIdRepositorySpy,
  CheckIfCarCategoryExistsByNameRepositorySpy,
  UpdateCarCategoryRepositorySpy,
  makeUpdateCarCategoryUseCaseInputMock,
} from '../../../mocks';

let findCarCategoryByIdRepositorySpy: FindCarCategoryByIdRepositorySpy;
let checkIfCarCategoryExistsByNameRepositorySpy: CheckIfCarCategoryExistsByNameRepositorySpy;
let updateCarCategoryRepositorySpy: UpdateCarCategoryRepositorySpy;

let updateCarCategoryUseCase: UpdateCarCategoryUseCase;

describe('UpdateCarCategoryUseCase', () => {
  beforeEach(() => {
    findCarCategoryByIdRepositorySpy = new FindCarCategoryByIdRepositorySpy();
    checkIfCarCategoryExistsByNameRepositorySpy =
      new CheckIfCarCategoryExistsByNameRepositorySpy();
    updateCarCategoryRepositorySpy = new UpdateCarCategoryRepositorySpy();

    updateCarCategoryUseCase = new UpdateCarCategoryUseCase(
      findCarCategoryByIdRepositorySpy,
      checkIfCarCategoryExistsByNameRepositorySpy,
      updateCarCategoryRepositorySpy
    );
  });

  it('should call FindCarCategoryByIdRepository with correct values', async () => {
    const findByIdSpy = jest.spyOn(
      findCarCategoryByIdRepositorySpy,
      'findById'
    );

    const input = makeUpdateCarCategoryUseCaseInputMock();

    await updateCarCategoryUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.id });
  });

  it('should throw if FindCarCategoryByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarCategoryUseCaseInputMock();

    const promise = updateCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarCategoryNotFoundWithProvidedIdError if FindCarCategoryByIdRepository returns null', async () => {
    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeUpdateCarCategoryUseCaseInputMock();

    const promise = updateCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryNotFoundWithProvidedIdError
    );
  });

  it('should not call CheckIfCarCategoryExistsByNameRepository if Category name not changed', async () => {
    const carCategoryMock = makeCarCategoryMock();

    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carCategoryMock);

    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarCategoryUseCaseInputMock();

    input.name = `    ${carCategoryMock.name.toUpperCase()}   `;

    await updateCarCategoryUseCase.execute(input);

    expect(checkIfExistsByNameSpy).not.toHaveBeenCalled();
  });

  it('should call CheckIfCarCategoryExistsByNameRepository once only if Category name has changed', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarCategoryUseCaseInputMock();

    await updateCarCategoryUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CheckIfCarCategoryExistsByNameRepository with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const input = makeUpdateCarCategoryUseCaseInputMock();

    await updateCarCategoryUseCase.execute(input);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name: input.name });
  });

  it('should throw if CheckIfCarCategoryExistsByNameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarCategoryUseCaseInputMock();

    const promise = updateCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarCategoryAlreadyExistsWithProvidedNameError if CheckIfCarCategoryExistsByNameRepository returns true', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const input = makeUpdateCarCategoryUseCaseInputMock();

    const promise = updateCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryAlreadyExistsWithProvidedNameError
    );
  });

  it('should call UpdateCarCategoryRepository once with correct values', async () => {
    const carCategoryMock = makeCarCategoryMock();

    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carCategoryMock);

    const updateSpy = jest.spyOn(updateCarCategoryRepositorySpy, 'update');

    const input = makeUpdateCarCategoryUseCaseInputMock();

    input.name = `  ${input.name}   `;
    input.description = ` ${input.description}  `;

    await updateCarCategoryUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: carCategoryMock.id,
      name: input.name.trim(),
      description: input.description.trim(),
    });
  });

  it('should throw if UpdateCarCategoryRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateCarCategoryRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateCarCategoryUseCaseInputMock();

    const promise = updateCarCategoryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the updated CarCategory on success', async () => {
    const carCategoryMock = makeCarCategoryMock();

    jest
      .spyOn(updateCarCategoryRepositorySpy, 'update')
      .mockResolvedValueOnce(carCategoryMock);

    const input = makeUpdateCarCategoryUseCaseInputMock();

    const output = await updateCarCategoryUseCase.execute(input);

    expect(output).toEqual(carCategoryMock);
  });
});
