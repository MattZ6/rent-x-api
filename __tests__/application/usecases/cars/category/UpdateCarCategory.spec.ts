import { faker } from '@faker-js/faker';

import {
  CarCategoryAlreadyExistsWithProvidedNameError,
  CarCategoryNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateCarCategoryUseCase } from '@application/usecases/car/category/UpdateCarCategory';

import { carCategoryMock } from '../../../../domain/models/car-category.mock';
import {
  CheckIfCarCategoryExistsByNameRepositorySpy,
  FindCarCategoryByIdRepositorySpy,
  UpdateCarCategoryRepositorySpy,
  updateCarCategoryUseCaseInputMock,
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

    const id = faker.datatype.uuid();

    await updateCarCategoryUseCase.execute({
      ...updateCarCategoryUseCaseInputMock,
      id,
    });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id });
  });

  it('should throw if FindCarCategoryByIdRepository throws', async () => {
    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarCategoryUseCase.execute(
      updateCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarCategoryNotFoundWithThisIdError if car category not exists', async () => {
    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = updateCarCategoryUseCase.execute(
      updateCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryNotFoundWithProvidedIdError
    );
  });

  it('should not call CheckIfCarCategoryExistsByNameRepository if category name not changed', async () => {
    const name = faker.datatype.string();

    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...carCategoryMock, name });

    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    await updateCarCategoryUseCase.execute({
      ...updateCarCategoryUseCaseInputMock,
      name: `       ${name.toUpperCase()} `,
    });

    expect(checkIfExistsByNameSpy).not.toHaveBeenCalled();
  });

  it('should call CheckIfCarCategoryExistsByNameRepository once only if category name has changed', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    await updateCarCategoryUseCase.execute(updateCarCategoryUseCaseInputMock);

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CheckIfCarCategoryExistsByNameRepository with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarCategoryExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const name = faker.datatype.string();

    await updateCarCategoryUseCase.execute({
      ...updateCarCategoryUseCaseInputMock,
      name,
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name });
  });

  it('should throw if CheckIfCarCategoryExistsByNameRepository throws', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarCategoryUseCase.execute(
      updateCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarCategoryAlreadyExistsWithThisNameError if already has a category with same name', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const promise = updateCarCategoryUseCase.execute(
      updateCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryAlreadyExistsWithProvidedNameError
    );
  });

  it('should call UpdateCarCategoryRepository once with correct values', async () => {
    jest
      .spyOn(findCarCategoryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...carCategoryMock });

    const updateSpy = jest.spyOn(updateCarCategoryRepositorySpy, 'update');

    const name = faker.datatype.string();
    const description = faker.datatype.string();

    await updateCarCategoryUseCase.execute({
      ...updateCarCategoryUseCaseInputMock,
      name,
      description,
    });

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      ...carCategoryMock,
      name,
      description,
    });
  });

  it('should throw if UpdateCarCategoryRepository throws', async () => {
    jest
      .spyOn(updateCarCategoryRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarCategoryUseCase.execute(
      updateCarCategoryUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should update car category', async () => {
    const category = await updateCarCategoryUseCase.execute(
      updateCarCategoryUseCaseInputMock
    );

    expect(category).toHaveProperty('id', updateCarCategoryUseCaseInputMock.id);
    expect(category).toHaveProperty(
      'name',
      updateCarCategoryUseCaseInputMock.name
    );
    expect(category).toHaveProperty(
      'description',
      updateCarCategoryUseCaseInputMock.description
    );
  });
});
