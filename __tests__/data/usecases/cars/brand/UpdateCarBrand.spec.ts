import faker from 'faker';

import {
  CarBrandAlreadyExistsWithThisNameError,
  CarBrandNotFoundWithThisIdError,
} from '@domain/errors';

import { UpdateCarBrandUseCase } from '@data/usecases/car/brand/UpdateCarBrand';

import { carBrandMock } from '../../../../domain/models/car-brand.mock';
import {
  CheckIfCarBrandExistsByNameRepositorySpy,
  FindCarBrandByIdRepositorySpy,
  UpdateCarBrandRepositorySpy,
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

    const id = faker.datatype.uuid();

    await updateCarBrandUseCase.execute({
      id,
      name: faker.datatype.string(),
    });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id });
  });

  it('should throw if FindCarBrandByIdRepository throws', async () => {
    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarBrandNotFoundWithThisIdError if car brand not exists', async () => {
    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandNotFoundWithThisIdError
    );
  });

  it('should not call CheckIfCarBrandExistsByNameRepository if brand name not changed', async () => {
    const name = faker.datatype.string();

    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...carBrandMock, name });

    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    await updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: `       ${name.toUpperCase()} `,
    });

    expect(checkIfExistsByNameSpy).not.toHaveBeenCalled();
  });

  it('should call CheckIfCarBrandExistsByNameRepository once only if brand name has changed', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    await updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CheckIfCarBrandExistsByNameRepository with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarBrandExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const name = faker.datatype.string();

    await updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name,
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name });
  });

  it('should throw if CheckIfCarBrandExistsByNameRepository throws', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarBrandAlreadyExistsWithThisNameError if already has a brand with same name', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByNameRepositorySpy, 'checkIfExistsByName')
      .mockResolvedValueOnce(true);

    const promise = updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandAlreadyExistsWithThisNameError
    );
  });

  it('should call UpdateCarBrandRepository once with correct values', async () => {
    jest
      .spyOn(findCarBrandByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...carBrandMock });

    const updateSpy = jest.spyOn(updateCarBrandRepositorySpy, 'update');

    const name = faker.datatype.string();

    await updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name,
    });

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      ...carBrandMock,
      name,
    });
  });

  it('should throw if UpdateCarBrandRepository throws', async () => {
    jest
      .spyOn(updateCarBrandRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarBrandUseCase.execute({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should update car brand', async () => {
    const id = faker.datatype.uuid();
    const name = faker.datatype.string();

    const brand = await updateCarBrandUseCase.execute({
      id,
      name,
    });

    expect(brand).toHaveProperty('id', id);
    expect(brand).toHaveProperty('name', name);
  });
});
