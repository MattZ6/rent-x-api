import {
  CarNotFoundWithProvidedIdError,
  CarSpecificationNotFoundWithProvidedIdError,
  NotFoundWithProvidedIdFromCar,
} from '@domain/errors';

import { RemoveSpecificationFromCarUseCase } from '@application/usecases/car/specification/RemoveFromCar';

import { makeErrorMock } from '../../../../domain';
import {
  CheckIfCarExistsByIdRepositorySpy,
  CheckIfCarSpecificationExistsByIdFromCarRepositorySpy,
  CheckIfCarSpecificationExistsByIdRepositorySpy,
  makeRemoveSpecificationFromCarUseCaseInputMock,
  RemoveCarSpecificationsFromCarRepositorySpy,
} from '../../../mocks';

let checkIfCarExistsByIdRepositorySpy: CheckIfCarExistsByIdRepositorySpy;
let checkIfCarSpecificationExistsByIdRepositorySpy: CheckIfCarSpecificationExistsByIdRepositorySpy;
let checkIfCarSpecificationExistsByIdFromCarRepositorySpy: CheckIfCarSpecificationExistsByIdFromCarRepositorySpy;
let removeCarSpecificationsFromCarRepositorySpy: RemoveCarSpecificationsFromCarRepositorySpy;

let removeSpecificationFromCarUseCase: RemoveSpecificationFromCarUseCase;

describe('RemoveSpecificationFromCarUseCase', () => {
  beforeEach(() => {
    checkIfCarExistsByIdRepositorySpy = new CheckIfCarExistsByIdRepositorySpy();
    checkIfCarSpecificationExistsByIdRepositorySpy =
      new CheckIfCarSpecificationExistsByIdRepositorySpy();
    checkIfCarSpecificationExistsByIdFromCarRepositorySpy =
      new CheckIfCarSpecificationExistsByIdFromCarRepositorySpy();
    removeCarSpecificationsFromCarRepositorySpy =
      new RemoveCarSpecificationsFromCarRepositorySpy();

    removeSpecificationFromCarUseCase = new RemoveSpecificationFromCarUseCase(
      checkIfCarExistsByIdRepositorySpy,
      checkIfCarSpecificationExistsByIdRepositorySpy,
      checkIfCarSpecificationExistsByIdFromCarRepositorySpy,
      removeCarSpecificationsFromCarRepositorySpy
    );
  });

  it('should call CheckIfCarExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    await removeSpecificationFromCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.car_id });
    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfCarExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarNotFoundWithProvidedIdError if CheckIfCarExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfCarSpecificationExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarSpecificationExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    await removeSpecificationFromCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.specification_id,
    });
    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfCarSpecificationExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdRepositorySpy,
        'checkIfExistsById'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarSpecificationNotFoundWithProvidedIdError if CheckIfCarSpecificationExistsByIdRepository returns false', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdRepositorySpy,
        'checkIfExistsById'
      )
      .mockResolvedValueOnce(false);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfCarSpecificationExistsByIdFromCarRepository once with correct values', async () => {
    const checkIfExistsByIdFromCarSpy = jest.spyOn(
      checkIfCarSpecificationExistsByIdFromCarRepositorySpy,
      'checkIfExistsByIdFromCar'
    );

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    await removeSpecificationFromCarUseCase.execute(input);

    expect(checkIfExistsByIdFromCarSpy).toHaveBeenCalledWith({
      car_id: input.car_id,
      specification_id: input.specification_id,
    });
    expect(checkIfExistsByIdFromCarSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfCarSpecificationExistsByIdFromCarRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdFromCarRepositorySpy,
        'checkIfExistsByIdFromCar'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw NotFoundWithProvidedIdFromCar if CheckIfCarSpecificationExistsByIdFromCarRepository returns false', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByIdFromCarRepositorySpy,
        'checkIfExistsByIdFromCar'
      )
      .mockResolvedValueOnce(false);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(NotFoundWithProvidedIdFromCar);
  });

  it('should call RemoveCarSpecificationsFromCarRepository once with correct values', async () => {
    const removeFromCarSpy = jest.spyOn(
      removeCarSpecificationsFromCarRepositorySpy,
      'removeFromCar'
    );

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    await removeSpecificationFromCarUseCase.execute(input);

    expect(removeFromCarSpy).toHaveBeenCalledWith({
      car_id: input.car_id,
      specification_id: input.specification_id,
    });
    expect(removeFromCarSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if RemoveCarSpecificationsFromCarRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(removeCarSpecificationsFromCarRepositorySpy, 'removeFromCar')
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveSpecificationFromCarUseCaseInputMock();

    const promise = removeSpecificationFromCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
