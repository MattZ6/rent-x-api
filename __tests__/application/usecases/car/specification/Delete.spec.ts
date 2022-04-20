import { CarSpecificationNotFoundWithProvidedIdError } from '@domain/errors';

import { DeleteCarSpecificationUseCase } from '@application/usecases/car/specification/Delete';

import { makeErrorMock } from '../../../../domain';
import {
  CheckIfCarSpecificationExistsByIdRepositorySpy,
  DeleteCarSpecificationByIdRepositorySpy,
  makeDeleteCarSpecificationUseCaseInputMock,
} from '../../../mocks';

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

    const input = makeDeleteCarSpecificationUseCaseInputMock();

    await deleteCarSpecificationUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.id });
  });

  it('should throw if CheckIfCarSpecificationExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdRepositorySpy,
        'checkIfExistsById'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeDeleteCarSpecificationUseCaseInputMock();

    const promise = deleteCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarSpecificationNotFoundWithProvidedIdError if CheckIfCarSpecificationExistsByIdRepository returns false', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdRepositorySpy,
        'checkIfExistsById'
      )
      .mockResolvedValueOnce(false);

    const input = makeDeleteCarSpecificationUseCaseInputMock();

    const promise = deleteCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationNotFoundWithProvidedIdError
    );
  });

  it('should call DeleteCarSpecificationByIdRepository once with correct values', async () => {
    const deleteByIdSpy = jest.spyOn(
      deleteCarSpecificationByIdRepositorySpy,
      'deleteById'
    );

    const input = makeDeleteCarSpecificationUseCaseInputMock();

    await deleteCarSpecificationUseCase.execute(input);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: input.id });
  });

  it('should throw if DeleteCarSpecificationByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteCarSpecificationByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(errorMock);

    const input = makeDeleteCarSpecificationUseCaseInputMock();

    const promise = deleteCarSpecificationUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
