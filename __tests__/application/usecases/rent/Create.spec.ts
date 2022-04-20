import faker from '@faker-js/faker';

import {
  UserNotFoundWithProvidedIdError,
  UserHasOutstandingRentPaymentsError,
  CarNotFoundWithProvidedIdError,
  RentalStartDateIsInThePastError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
} from '@domain/errors';

import { CreateRentUseCase } from '@application/usecases/rent/Create';

import { makeCarMock, makeErrorMock, makeRentMock } from '../../../domain';
import {
  CheckIfUserExistsByIdRepositorySpy,
  CheckIfRentExistsWithPendingPaymentByUserRepositorySpy,
  FindCarByIdRepositorySpy,
  CheckIfRentExistsByOpenScheduleForCarRepositorySpy,
  CreateRentRepositorySpy,
  makeCreateRentUseCaseRentDurationInMillisseconds,
  makeCreateRentUseCaseInputMock,
} from '../../mocks';

function setSafeStartDate(startDate: Date) {
  const yesterday = faker.date.recent(
    1,
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    ).toUTCString()
  );

  jest.spyOn(Date, 'now').mockReturnValueOnce(yesterday.getTime());
}

let checkIfUserExistsByIdRepositorySpy: CheckIfUserExistsByIdRepositorySpy;
let checkIfRentExistsWithPendingPaymentByUserRepositorySpy: CheckIfRentExistsWithPendingPaymentByUserRepositorySpy;
let findCarByIdRepositorySpy: FindCarByIdRepositorySpy;
let createRentUseCaseRentDurationInMillisseconds: number;
let checkIfRentExistsByOpenScheduleForCarRepositorySpy: CheckIfRentExistsByOpenScheduleForCarRepositorySpy;
let createRentRepositorySpy: CreateRentRepositorySpy;

let createRentUseCase: CreateRentUseCase;

describe('CreateRentUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByIdRepositorySpy =
      new CheckIfUserExistsByIdRepositorySpy();
    checkIfRentExistsWithPendingPaymentByUserRepositorySpy =
      new CheckIfRentExistsWithPendingPaymentByUserRepositorySpy();
    findCarByIdRepositorySpy = new FindCarByIdRepositorySpy();
    createRentUseCaseRentDurationInMillisseconds =
      makeCreateRentUseCaseRentDurationInMillisseconds();
    checkIfRentExistsByOpenScheduleForCarRepositorySpy =
      new CheckIfRentExistsByOpenScheduleForCarRepositorySpy();
    createRentRepositorySpy = new CreateRentRepositorySpy();

    createRentUseCase = new CreateRentUseCase(
      checkIfUserExistsByIdRepositorySpy,
      checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
      findCarByIdRepositorySpy,
      createRentUseCaseRentDurationInMillisseconds,
      checkIfRentExistsByOpenScheduleForCarRepositorySpy,
      createRentRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    await createRentUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if CheckIfUserExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateRentUseCaseInputMock();

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if CheckIfUserExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeCreateRentUseCaseInputMock();

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfRentExistsWithPendingPaymentByUserRepository once with correct values', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const checksIfExistsWithPendingPaymentByUserSpy = jest.spyOn(
      checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
      'checkIfExistsWithPendingPaymentByUser'
    );

    await createRentUseCase.execute(input);

    expect(checksIfExistsWithPendingPaymentByUserSpy).toHaveBeenCalledTimes(1);
    expect(checksIfExistsWithPendingPaymentByUserSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
    });
  });

  it('should throw if CheckIfRentExistsWithPendingPaymentByUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
        'checkIfExistsWithPendingPaymentByUser'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateRentUseCaseInputMock();

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserHasOutstandingRentPaymentsError if CheckIfRentExistsWithPendingPaymentByUserRepository returns true', async () => {
    jest
      .spyOn(
        checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
        'checkIfExistsWithPendingPaymentByUser'
      )
      .mockResolvedValueOnce(true);

    const input = makeCreateRentUseCaseInputMock();

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserHasOutstandingRentPaymentsError
    );
  });

  it('should call FindCarByIdRepository once with correct values', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const findById = jest.spyOn(findCarByIdRepositorySpy, 'findById');

    await createRentUseCase.execute(input);

    expect(findById).toHaveBeenCalledTimes(1);
    expect(findById).toHaveBeenCalledWith({ id: input.car_id });
  });

  it('should throw if FindCarByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateRentUseCaseInputMock();

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarNotFoundWithProvidedIdError if FindCarByIdRepository returns null', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeCreateRentUseCaseInputMock();

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should throw RentalStartDateIsInThePastError if start duration less than tomorrow', async () => {
    const input = makeCreateRentUseCaseInputMock();

    input.expected_return_date = new Date(
      input.start_date.getTime() + createRentUseCaseRentDurationInMillisseconds
    );

    const edgeDate = new Date(
      input.start_date.getFullYear(),
      input.start_date.getMonth(),
      input.start_date.getDate()
    );

    jest.spyOn(Date, 'now').mockReturnValueOnce(edgeDate.getTime());

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      RentalStartDateIsInThePastError
    );
  });

  it('should throw InvalidRentDurationTimeError if the rental duration is less than the defined minimum ', async () => {
    const input = makeCreateRentUseCaseInputMock();

    input.expected_return_date = new Date(
      input.start_date.getTime() +
        createRentUseCaseRentDurationInMillisseconds -
        1
    );

    setSafeStartDate(input.start_date);

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(InvalidRentDurationTimeError);
  });

  it('should call CheckIfRentExistsByOpenScheduleForCarRepository once with correct values', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const checkIfExistsByOpenScheduleForCarSpy = jest.spyOn(
      checkIfRentExistsByOpenScheduleForCarRepositorySpy,
      'checkIfExistsByOpenScheduleForCar'
    );

    await createRentUseCase.execute(input);

    expect(checkIfExistsByOpenScheduleForCarSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByOpenScheduleForCarSpy).toHaveBeenCalledWith({
      car_id: input.car_id,
      start: input.start_date,
      end: input.expected_return_date,
    });
  });

  it('should throw if CheckIfRentExistsByOpenScheduleForCarRepository throws', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfRentExistsByOpenScheduleForCarRepositorySpy,
        'checkIfExistsByOpenScheduleForCar'
      )
      .mockRejectedValueOnce(errorMock);

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarAlreadyBookedOnThisDateError if CheckIfRentExistsByOpenScheduleForCarRepository returns true', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    jest
      .spyOn(
        checkIfRentExistsByOpenScheduleForCarRepositorySpy,
        'checkIfExistsByOpenScheduleForCar'
      )
      .mockResolvedValueOnce(true);

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarAlreadyBookedOnThisDateError
    );
  });

  it('should call CreateRentRepository once with correct values', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const carMock = makeCarMock();

    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carMock);

    const createSpy = jest.spyOn(createRentRepositorySpy, 'create');

    await createRentUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
      car_id: input.car_id,
      start_date: input.start_date,
      expected_return_date: input.expected_return_date,
      daily_rate: carMock.daily_rate,
      daily_late_fee: carMock.daily_late_fee,
    });
  });

  it('should throw if CreateRentRepository throws', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const errorMock = makeErrorMock();

    jest
      .spyOn(createRentRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const promise = createRentUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return created Rent on success', async () => {
    const input = makeCreateRentUseCaseInputMock();

    setSafeStartDate(input.start_date);

    const rentMock = makeRentMock();

    jest
      .spyOn(createRentRepositorySpy, 'create')
      .mockResolvedValueOnce(rentMock);

    const output = await createRentUseCase.execute(input);

    expect(output).toEqual(rentMock);
  });
});
