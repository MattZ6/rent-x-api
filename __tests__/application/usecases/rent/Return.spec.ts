import { faker } from '@faker-js/faker';

import {
  RentNotFoundWithProvidedIdError,
  RentBelongsToAnotherUserError,
  RentalIsNotInProgressError,
  RentAlreadyClosedError,
} from '@domain/errors';

import { ReturnRentUseCase } from '@application/usecases/rent/Return';

import {
  makeErrorMock,
  makeRentMock,
  makeRentPaymentMock,
} from '../../../domain';
import {
  FindRentalByIdRepositorySpy,
  CreateRentPaymentRepositorySpy,
  UpdateRentRepositorySpy,
  GetDurationInDaysProviderSpy,
  makeReturnRentUseCaseInputMock,
} from '../../mocks';

let findRentalByIdRepositorySpy: FindRentalByIdRepositorySpy;
let getDurationInDaysProviderSpy: GetDurationInDaysProviderSpy;
let createRentPaymentRepositorySpy: CreateRentPaymentRepositorySpy;
let updateRentRepositorySpy: UpdateRentRepositorySpy;

let returnRentUseCase: ReturnRentUseCase;

describe('ReturnRentUseCase', () => {
  beforeEach(() => {
    findRentalByIdRepositorySpy = new FindRentalByIdRepositorySpy();
    getDurationInDaysProviderSpy = new GetDurationInDaysProviderSpy();
    createRentPaymentRepositorySpy = new CreateRentPaymentRepositorySpy();
    updateRentRepositorySpy = new UpdateRentRepositorySpy();

    returnRentUseCase = new ReturnRentUseCase(
      findRentalByIdRepositorySpy,
      getDurationInDaysProviderSpy,
      createRentPaymentRepositorySpy,
      updateRentRepositorySpy
    );
  });

  it('should call FindRentalByIdRepository once with correct values', async () => {
    const rentMock = makeRentMock();

    const input = makeReturnRentUseCaseInputMock();

    input.user_id = rentMock.user_id;

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const findByIdSpy = jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    await returnRentUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: input.rent_id,
    });
  });

  it('should throw if FindRentalByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeReturnRentUseCaseInputMock();

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw RentNotFoundWithProvidedIdError if FindRentalByIdRepository returns null', async () => {
    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeReturnRentUseCaseInputMock();

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      RentNotFoundWithProvidedIdError
    );
  });

  it('should throw RentBelongsToAnotherUserError if rent belongs to another user', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    const input = makeReturnRentUseCaseInputMock();

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(RentBelongsToAnotherUserError);
  });

  it('should throw RentalIsNotInProgressError if the rental is not in progress', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(rentMock.start_date.getTime() - 1);

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(RentalIsNotInProgressError);
  });

  it('should throw RentAlreadyClosedError if rent is already closed/returned', async () => {
    const rentMock = makeRentMock();

    rentMock.return_date = new Date();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(RentAlreadyClosedError);
  });

  it('should call GetDurationInDaysProvider twice with correct values', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    const getDurationInDaysSpy = jest.spyOn(
      getDurationInDaysProviderSpy,
      'getDurationInDays'
    );

    const input = makeReturnRentUseCaseInputMock();

    const returnDate = rentMock.start_date;

    jest.spyOn(Date, 'now').mockReturnValueOnce(returnDate.getTime());

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    await returnRentUseCase.execute(input);

    expect(getDurationInDaysSpy).toHaveBeenCalledTimes(2);
    expect(getDurationInDaysSpy).toHaveBeenNthCalledWith(1, {
      start_date: rentMock.start_date,
      end_date: rentMock.expected_return_date,
    });
    expect(getDurationInDaysSpy).toHaveBeenNthCalledWith(2, {
      start_date: rentMock.start_date,
      end_date: returnDate,
    });
  });

  it('should throw if GetDurationInDaysProvider throws', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const errorMock = makeErrorMock();

    jest
      .spyOn(getDurationInDaysProviderSpy, 'getDurationInDays')
      .mockImplementationOnce(() => {
        throw errorMock;
      });

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateRentPaymentRepository once with correct values', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const rentDurationInDays = faker.datatype.number({ min: 1 });

    jest
      .spyOn(getDurationInDaysProviderSpy, 'getDurationInDays')
      .mockReturnValueOnce(rentDurationInDays)
      .mockReturnValueOnce(rentDurationInDays);

    const total = rentDurationInDays * rentMock.daily_rate;

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    await returnRentUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      rent_id: rentMock.id,
      total,
    });
  });

  it('should call CreateRentPaymentRepository with the total considering the daily fine in case of delay', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const expectedRentDurationInDays = faker.datatype.number({ min: 1 });
    const rentDurationInDays = faker.datatype.number({
      min: expectedRentDurationInDays + 1,
    });

    jest
      .spyOn(getDurationInDaysProviderSpy, 'getDurationInDays')
      .mockReturnValueOnce(expectedRentDurationInDays)
      .mockReturnValueOnce(rentDurationInDays);

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const daysOfDelay = rentDurationInDays - expectedRentDurationInDays;

    const total =
      rentMock.daily_rate * expectedRentDurationInDays +
      rentMock.daily_late_fee * daysOfDelay;

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    await returnRentUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledWith({
      rent_id: rentMock.id,
      total,
    });
  });

  it('should throw if CreateRentPaymentRepository throws', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const errorMock = makeErrorMock();

    jest
      .spyOn(createRentPaymentRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call UpdateRentRepository once with correct values', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    const returnDate = rentMock.start_date;

    jest.spyOn(Date, 'now').mockReturnValueOnce(returnDate.getTime());

    const rentPaymentMock = makeRentPaymentMock();

    jest
      .spyOn(createRentPaymentRepositorySpy, 'create')
      .mockResolvedValueOnce(rentPaymentMock);

    const updateSpy = jest.spyOn(updateRentRepositorySpy, 'update');

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    await returnRentUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: rentMock.id,
      return_date: returnDate,
      payment_id: rentPaymentMock.id,
    });
  });

  it('should throw if UpdateRentRepository throws', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const errorMock = makeErrorMock();

    jest
      .spyOn(updateRentRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    const promise = returnRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the updated Rent on success', async () => {
    const rentMock = makeRentMock();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(rentMock);

    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    const updatedRentMock = makeRentMock();

    jest
      .spyOn(updateRentRepositorySpy, 'update')
      .mockResolvedValueOnce(updatedRentMock);

    const input = makeReturnRentUseCaseInputMock();

    input.rent_id = rentMock.id;
    input.user_id = rentMock.user_id;

    const output = await returnRentUseCase.execute(input);

    expect(output).toEqual(updatedRentMock);
  });
});
