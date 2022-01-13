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

const oneDayInMillisseconds = 1 * 24 * 60 * 60 * 1000;

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
    jest.spyOn(Date, 'now').mockReturnValueOnce(rentMock.start_date.getTime());

    jest.spyOn(findRentalByIdRepositorySpy, 'findById').mockResolvedValueOnce({
      ...rentMock,
      return_date: faker.datatype.datetime(),
    });

    const promise = returnRentUseCase.execute(returnRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(RentAlreadyClosedError);
  });

  it('should call CreateRentPaymentRepository once with correct values', async () => {
    const returnDateInMillisseconds = faker.date
      .soon(faker.datatype.number({ min: 1 }), rentMock.start_date)
      .getTime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(returnDateInMillisseconds);

    const rentId = faker.datatype.uuid();

    jest
      .spyOn(findRentalByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...rentMock, id: rentId });

    const createSpy = jest.spyOn(createRentPaymentRepositorySpy, 'create');

    const rentDurationInMillisseconds =
      returnDateInMillisseconds - rentMock.start_date.getTime();

    const rentDurationInDays = Math.ceil(
      rentDurationInMillisseconds / oneDayInMillisseconds
    );

    const total = rentDurationInDays * rentMock.daily_rate;

    await returnRentUseCase.execute(returnRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({ rent_id: rentId, total });
  });
});
