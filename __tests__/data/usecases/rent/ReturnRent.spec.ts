import faker from 'faker';

import {
  RentBelongsToAnotherUserError,
  RentNotFoundWithProvidedIdError,
  RentAlreadyClosedError,
  UnableToReturnRentalThatIsNotInProgressError,
} from '@domain/errors';

import { ReturnRentUseCase } from '@data/usecases/rent/ReturnRent';

import { rentMock } from '../../../domain/models/rent.mock';
import {
  CreateRentPaymentRepositorySpy,
  FindRentalByIdRepositorySpy,
  returnRentUseCaseInputMock,
} from '../../mocks';

function setSafeReturnDate() {
  const returnDateMock = faker.date.between(
    rentMock.start_date,
    rentMock.expected_return_date
  );

  jest.spyOn(Date, 'now').mockReturnValueOnce(returnDateMock.getTime());

  return { returnDateMock };
}

function setLateReturnDate() {
  const lateReturnDateMock = faker.date.soon(
    faker.datatype.number({ min: 1 }),
    rentMock.expected_return_date
  );

  jest.spyOn(Date, 'now').mockReturnValueOnce(lateReturnDateMock.getTime());

  return { lateReturnDateMock };
}

function getDurationInDays(startDate: Date, endDate: Date) {
  const oneDayInMillisseconds = 1 * 24 * 60 * 60 * 1000;

  const durationInMillisseconds = endDate.getTime() - startDate.getTime();

  return Math.ceil(durationInMillisseconds / oneDayInMillisseconds);
}

let findRentalByIdRepositorySpy: FindRentalByIdRepositorySpy;
let createRentPaymentRepositorySpy: CreateRentPaymentRepositorySpy;

let returnRentUseCase: ReturnRentUseCase;

describe('ReturnRentUseCase', () => {
  beforeEach(() => {
    findRentalByIdRepositorySpy = new FindRentalByIdRepositorySpy();
    createRentPaymentRepositorySpy = new CreateRentPaymentRepositorySpy();

    returnRentUseCase = new ReturnRentUseCase(
      findRentalByIdRepositorySpy,
      createRentPaymentRepositorySpy
    );
  });

  it('should call FindRentalByIdRepository once with correct values', async () => {
    setSafeReturnDate();

    const findByIdSpy = jest.spyOn(findRentalByIdRepositorySpy, 'findById');

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: returnRentUseCaseInputMock.rent_id,
    });
  });

  it('should throw if FindRentalByIdRepository throws', async () => {
    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw RentNotFoundWithProvidedIdError if rent not exists', async () => {
    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      RentNotFoundWithProvidedIdError
    );
  });

  it('should throw RentBelongsToAnotherUserError if rent belongs to another user', async () => {
    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...rentMock, id: faker.datatype.uuid() });

    const promise = returnRentUseCase.execute({
      ...returnRentUseCaseInputMock,
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toBeInstanceOf(RentBelongsToAnotherUserError);
  });

  it('should throw UnableToReturnRentalThatIsNotInProgressError if the rental is not in progress', async () => {
    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(rentMock.start_date.getTime() - 1);

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      UnableToReturnRentalThatIsNotInProgressError
    );
  });

  it('should throw RentAlreadyClosedError if rent is already closed/returned', async () => {
    setSafeReturnDate();

    jest.spyOn(findRentalByIdRepositorySpy, 'findById').mockResolvedValueOnce({
      ...rentMock,
      return_date: faker.datatype.datetime(),
    });

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(RentAlreadyClosedError);
  });

  it('should call CreateRentPaymentRepository once with correct values', async () => {
    const { returnDateMock } = setSafeReturnDate();

    const rentId = faker.datatype.uuid();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...rentMock, id: rentId });

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const rentDurationInDays = getDurationInDays(
      rentMock.start_date,
      returnDateMock
    );

    const total = rentDurationInDays * rentMock.daily_rate;

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ rent_id: rentId, total });
  });

  it('should call CreateRentPaymentRepository with the total considering the daily fine in case of delay', async () => {
    const { lateReturnDateMock } = setLateReturnDate();

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const expectedRentDurationInDays = getDurationInDays(
      rentMock.start_date,
      rentMock.expected_return_date
    );

    const rentDurationInDays = getDurationInDays(
      rentMock.start_date,
      lateReturnDateMock
    );

    const daysOfDelay = rentDurationInDays - expectedRentDurationInDays;

    const total =
      rentMock.daily_rate * expectedRentDurationInDays +
      rentMock.daily_late_fee * daysOfDelay;

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledWith({
      rent_id: rentMock.id,
      total,
    });
  });

  it('should throw if CreateRentPaymentRepository throws', async () => {
    setSafeReturnDate();

    const error = new Error(faker.datatype.string());

    jest
      .spyOn(createRentPaymentRepositorySpy, 'create')
      .mockRejectedValueOnce(error);

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toThrowError(error);
  });
});
