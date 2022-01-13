import faker from 'faker';

import {
  RentBelongsToAnotherUserError,
  RentNotFoundWithProvidedIdError,
  RentAlreadyClosedError,
  UnableToReturnRentalThatIsNotInProgressError,
} from '@domain/errors';
import { IRent } from '@domain/models/Rent';

import { ReturnRentUseCase } from '@data/usecases/rent/ReturnRent';

import { makeRentPaymentMock } from '../../../domain/models/rent-payment.mock';
import { makeRentMock, rentMock } from '../../../domain/models/rent.mock';
import {
  CreateRentPaymentRepositorySpy,
  FindRentalByIdRepositorySpy,
  returnRentUseCaseInputMock,
  UpdateRentRepositorySpy,
} from '../../mocks';

function setSafeReturnDate(rent?: IRent) {
  const returnDateMock = faker.date.between(
    rent?.start_date ?? rentMock.start_date,
    rent?.expected_return_date ?? rentMock.expected_return_date
  );

  jest.spyOn(Date, 'now').mockReturnValueOnce(returnDateMock.getTime());

  return { returnDateMock };
}

function setLateReturnDate(rent?: IRent) {
  const lateReturnDateMock = faker.date.soon(
    faker.datatype.number({ min: 1 }),
    rent?.expected_return_date ?? rentMock.expected_return_date
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
let updateRentRepositorySpy: UpdateRentRepositorySpy;

let returnRentUseCase: ReturnRentUseCase;

describe('ReturnRentUseCase', () => {
  beforeEach(() => {
    findRentalByIdRepositorySpy = new FindRentalByIdRepositorySpy();
    createRentPaymentRepositorySpy = new CreateRentPaymentRepositorySpy();
    updateRentRepositorySpy = new UpdateRentRepositorySpy();

    returnRentUseCase = new ReturnRentUseCase(
      findRentalByIdRepositorySpy,
      createRentPaymentRepositorySpy,
      updateRentRepositorySpy
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
    const { rent } = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rent);

    const { returnDateMock } = setSafeReturnDate(rent);

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const rentDurationInDays = getDurationInDays(
      rent.start_date,
      returnDateMock
    );

    const total = rentDurationInDays * rent.daily_rate;

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ rent_id: rent.id, total });
  });

  it('should call CreateRentPaymentRepository with the total considering the daily fine in case of delay', async () => {
    const { rent } = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rent);

    const { lateReturnDateMock } = setLateReturnDate(rent);

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const expectedRentDurationInDays = getDurationInDays(
      rent.start_date,
      rent.expected_return_date
    );

    const rentDurationInDays = getDurationInDays(
      rent.start_date,
      lateReturnDateMock
    );

    const daysOfDelay = rentDurationInDays - expectedRentDurationInDays;

    const total =
      rent.daily_rate * expectedRentDurationInDays +
      rent.daily_late_fee * daysOfDelay;

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledWith({
      rent_id: rent.id,
      total,
    });
  });

  it('should throw if CreateRentPaymentRepository throws', async () => {
    const { rent } = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rent);

    setSafeReturnDate(rent);

    const error = new Error(faker.datatype.string());

    jest
      .spyOn(createRentPaymentRepositorySpy, 'create')
      .mockRejectedValueOnce(error);

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should call UpdateRentRepository once with correct values', async () => {
    const { rent } = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rent);

    const { returnDateMock } = setSafeReturnDate(rent);

    const { rentPayment } = makeRentPaymentMock();

    jest
      .spyOn(createRentPaymentRepositorySpy, 'create')
      .mockResolvedValueOnce(rentPayment);

    const updateSpy = jest.spyOn(updateRentRepositorySpy, 'update');

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      ...rent,
      return_date: returnDateMock,
      payment: rentPayment,
    });
  });

  it('should throw if UpdateRentRepository throws', async () => {
    const { rent } = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rent);

    setSafeReturnDate(rent);

    const { rentPayment } = makeRentPaymentMock();

    jest
      .spyOn(createRentPaymentRepositorySpy, 'create')
      .mockResolvedValueOnce(rentPayment);

    const error = new Error(faker.datatype.string());

    jest.spyOn(updateRentRepositorySpy, 'update').mockRejectedValueOnce(error);

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return the updated rent on success', async () => {
    const { rent } = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rent);

    setSafeReturnDate(rent);

    const result = await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(result).toEqual(rent);
  });
});
