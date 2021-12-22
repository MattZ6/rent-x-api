import faker from 'faker';

import { CarSpecificationNotFoundWithThisIdError } from '@domain/errors';

import { DeleteCarSpecificationUseCase } from '@data/usecases/car/DeleteCarSpecification';

import {
  CheckIfCarSpecificationExistsByIdRepositorySpy,
  DeleteCarSpecificationByIdRepositorySpy,
} from '../../mocks';

let checkIfCarSpecificationExistsByIdRepositorySpy: CheckIfCarSpecificationExistsByIdRepositorySpy;
let deleteCarSpecificationByIdRepositorySpy: DeleteCarSpecificationByIdRepositorySpy;

let deleteCarSpecificationUseCase: DeleteCarSpecificationUseCase;

describe('DeleteCarSpecificationUseCase', () => {
  beforeEach(() => {
    checkIfCarSpecificationExistsByIdRepositorySpy =
      new CheckIfCarSpecificationExistsByIdRepositorySpy();
    deleteCarSpecificationByIdRepositorySpy =
      new DeleteCarSpecificationByIdRepositorySpy();

    deleteCarSpecificationUseCase = new DeleteCarSpecificationUseCase(
      checkIfCarSpecificationExistsByIdRepositorySpy,
      deleteCarSpecificationByIdRepositorySpy
    );
  });

  it('should call CheckIfCarSpecificationExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarSpecificationExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const id = faker.datatype.uuid();

    await deleteCarSpecificationUseCase.execute({ id });

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if CheckIfCarSpecificationExistsByIdRepository throws', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdRepositorySpy,
        'checkIfExistsById'
      )
      .mockRejectedValueOnce(new Error());

    const promise = deleteCarSpecificationUseCase.execute({
      id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarSpecificationNotFoundWithThisIdError if car specification not exist', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdRepositorySpy,
        'checkIfExistsById'
      )
      .mockResolvedValueOnce(false);

    const promise = deleteCarSpecificationUseCase.execute({
      id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationNotFoundWithThisIdError
    );
  });

  it('should call DeleteCarSpecificationByIdRepository once with correct values', async () => {
    const deleteByIdSpy = jest.spyOn(
      deleteCarSpecificationByIdRepositorySpy,
      'deleteById'
    );

    const id = faker.datatype.uuid();

    await deleteCarSpecificationUseCase.execute({ id });

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should throw if DeleteCarSpecificationByIdRepository throws', async () => {
    jest
      .spyOn(deleteCarSpecificationByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(new Error());

    const promise = deleteCarSpecificationUseCase.execute({
      id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });
});
