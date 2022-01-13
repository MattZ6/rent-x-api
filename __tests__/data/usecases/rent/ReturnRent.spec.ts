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
  const returnDateInMillisseconds = faker.date
    .between(rentMock.start_date, rentMock.expected_return_date)
    .getTime();

  jest.spyOn(Date, 'now').mockReturnValueOnce(returnDateInMillisseconds);

  return { returnDateInMillisseconds };
}

function setLateReturnDate() {
  const lateReturnDateInMillisseconds = faker.date
    .soon(faker.datatype.number({ min: 1 }), rentMock.expected_return_date)
    .getTime();

  jest.spyOn(Date, 'now').mockReturnValueOnce(lateReturnDateInMillisseconds);

  return { lateReturnDateInMillisseconds };
}

const oneDayInMillisseconds = 1 * 24 * 60 * 60 * 1000;

function getDurationInDays(startDate: Date, endDate: Date) {
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
    const returnDateInMillisseconds = rentMock.start_date.getTime() - 1;

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...rentMock });

    jest.spyOn(Date, 'now').mockReturnValueOnce(returnDateInMillisseconds);

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
    const { returnDateInMillisseconds } = setSafeReturnDate();

    const rentId = faker.datatype.uuid();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...rentMock, id: rentId });

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const rentDurationInDays = getDurationInDays(
      rentMock.start_date,
      new Date(returnDateInMillisseconds)
    );

    const total = rentDurationInDays * rentMock.daily_rate;

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ rent_id: rentId, total });
  });

  it('should call CreateRentPaymentRepository with the total considering the daily fine in case of delay', async () => {
    const { lateReturnDateInMillisseconds } = setLateReturnDate();

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const expectedRentDurationInDays = getDurationInDays(
      rentMock.start_date,
      rentMock.expected_return_date
    );

    const rentDurationInDays = getDurationInDays(
      rentMock.start_date,
      new Date(lateReturnDateInMillisseconds)
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
