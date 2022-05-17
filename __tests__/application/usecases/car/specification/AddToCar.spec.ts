import {
  CarNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsAlreadyRelatedToCarError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';

import { AddSpecificationsToCarUseCase } from '@application/usecases/car/specification/AddToCar';

import { makeErrorMock } from '../../../../domain';
import {
  CheckIfAllCarSpecificationsExistsByIdsRepositorySpy,
  CheckIfCarExistsByIdRepositorySpy,
  CheckIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy,
  makeAddSpecificationsToCarUseCaseInputMock,
  RelateCarSpecificationsToCarRepositorySpy,
} from '../../../mocks';

let checkIfCarExistsByIdRepositorySpy: CheckIfCarExistsByIdRepositorySpy;
let checkIfAllCarSpecificationsExistsByIdsRepositorySpy: CheckIfAllCarSpecificationsExistsByIdsRepositorySpy;
let checkIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy: CheckIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy;
let relateCarSpecificationsToCarRepositorySpy: RelateCarSpecificationsToCarRepositorySpy;

let addSpecificationsToCarUseCase: AddSpecificationsToCarUseCase;

describe('AddSpecificationsToCarUseCase', () => {
  beforeEach(() => {
    checkIfCarExistsByIdRepositorySpy = new CheckIfCarExistsByIdRepositorySpy();
    checkIfAllCarSpecificationsExistsByIdsRepositorySpy =
      new CheckIfAllCarSpecificationsExistsByIdsRepositorySpy();
    checkIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy =
      new CheckIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy();
    relateCarSpecificationsToCarRepositorySpy =
      new RelateCarSpecificationsToCarRepositorySpy();

    addSpecificationsToCarUseCase = new AddSpecificationsToCarUseCase(
      checkIfCarExistsByIdRepositorySpy,
      checkIfAllCarSpecificationsExistsByIdsRepositorySpy,
      checkIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy,
      relateCarSpecificationsToCarRepositorySpy
    );
  });

  it('should call CheckIfCarExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    await addSpecificationsToCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.car_id });
    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfCarExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promise = addSpecificationsToCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarNotFoundWithProvidedIdError if CheckIfCarExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promise = addSpecificationsToCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfAllCarSpecificationsExistsByIdsRepository once with correct values', async () => {
    const checkIfAllExistsByIdsSpy = jest.spyOn(
      checkIfAllCarSpecificationsExistsByIdsRepositorySpy,
      'checkIfAllExistsByIds'
    );

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    input.specifications_ids.push(...input.specifications_ids);

    await addSpecificationsToCarUseCase.execute(input);

    expect(checkIfAllExistsByIdsSpy).toHaveBeenCalledWith({
      ids: [...new Set(input.specifications_ids)],
    });
    expect(checkIfAllExistsByIdsSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfAllCarSpecificationsExistsByIdsRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfAllCarSpecificationsExistsByIdsRepositorySpy,
        'checkIfAllExistsByIds'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promsie = addSpecificationsToCarUseCase.execute(input);

    await expect(promsie).rejects.toThrowError(errorMock);
  });

  it('should throw OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError if CheckIfAllCarSpecificationsExistsByIdsRepository returns false', async () => {
    jest
      .spyOn(
        checkIfAllCarSpecificationsExistsByIdsRepositorySpy,
        'checkIfAllExistsByIds'
      )
      .mockResolvedValueOnce(false);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promsie = addSpecificationsToCarUseCase.execute(input);

    await expect(promsie).rejects.toBeInstanceOf(
      OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError
    );
  });

  it('should call CheckIfSomeCarSpecificationExistsByIdsFromCarRepository once with correct values', async () => {
    const checkIfSomeExistsByIdsFromCarSpy = jest.spyOn(
      checkIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy,
      'checkIfSomeExistsByIdsFromCar'
    );

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    input.specifications_ids.push(...input.specifications_ids);

    await addSpecificationsToCarUseCase.execute(input);

    expect(checkIfSomeExistsByIdsFromCarSpy).toHaveBeenCalledWith({
      car_id: input.car_id,
      specifications_ids: [...new Set(input.specifications_ids)],
    });
    expect(checkIfSomeExistsByIdsFromCarSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfSomeCarSpecificationExistsByIdsFromCarRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy,
        'checkIfSomeExistsByIdsFromCar'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promise = addSpecificationsToCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw OneOrMoreCarSpecificationsAlreadyRelatedToCarError if CheckIfSomeCarSpecificationExistsByIdsFromCarRepository returns true', async () => {
    jest
      .spyOn(
        checkIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy,
        'checkIfSomeExistsByIdsFromCar'
      )
      .mockResolvedValueOnce(true);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promise = addSpecificationsToCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      OneOrMoreCarSpecificationsAlreadyRelatedToCarError
    );
  });

  it('should call RelateCarSpecificationsToCarRepository once with correct values', async () => {
    const relateToCarSpy = jest.spyOn(
      relateCarSpecificationsToCarRepositorySpy,
      'relateToCar'
    );

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    input.specifications_ids.push(...input.specifications_ids);

    await addSpecificationsToCarUseCase.execute(input);

    expect(relateToCarSpy).toHaveBeenCalledWith({
      car_id: input.car_id,
      specifications_ids: [...new Set(input.specifications_ids)],
    });
    expect(relateToCarSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if RelateCarSpecificationsToCarRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(relateCarSpecificationsToCarRepositorySpy, 'relateToCar')
      .mockRejectedValueOnce(errorMock);

    const input = makeAddSpecificationsToCarUseCaseInputMock();

    const promise = addSpecificationsToCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
