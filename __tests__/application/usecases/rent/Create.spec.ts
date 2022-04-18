import { faker } from '@faker-js/faker';

import {
  CarNotFoundWithProvidedIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
  UserHasOutstandingRentPaymentsError,
  UserNotFoundWithProvidedIdError,
  RentalStartDateIsInThePastError,
} from '@domain/errors';

import { CreateRentUseCase } from '@application/usecases/rent/Create';

import { carMock, rentMock } from '../../../domain/models';
import {
  CheckIfRentExistsByOpenScheduleForCarRepositorySpy,
  CheckIfUserExistsByIdRepositorySpy,
  CheckIfRentExistsWithPendingPaymentByUserRepositorySpy,
  CreateRentRepositorySpy,
  FindCarByIdRepositorySpy,
  minimumRentDurationTimeInMillissecondsMock,
  createRentUseCaseInputMock,
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
    checkIfRentExistsByOpenScheduleForCarRepositorySpy =
      new CheckIfRentExistsByOpenScheduleForCarRepositorySpy();
    createRentRepositorySpy = new CreateRentRepositorySpy();

    createRentUseCase = new CreateRentUseCase(
      checkIfUserExistsByIdRepositorySpy,
      checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
      findCarByIdRepositorySpy,
      minimumRentDurationTimeInMillissecondsMock,
      checkIfRentExistsByOpenScheduleForCarRepositorySpy,
      createRentRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const userId = faker.datatype.uuid();

    await createRentUseCase.execute({
      ...createRentUseCaseInputMock,
      user_id: userId,
    });

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: userId });
  });

  it('should throw if CheckIfUserExistsByIdRepository throws', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(new Error());

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundWithThisIdError if user not exist', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfRentExistsWithPendingPaymentByUserRepository once with correct values', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    const checksIfExistsWithPendingPaymentByUserSpy = jest.spyOn(
      checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
      'checkIfExistsWithPendingPaymentByUser'
    );

    await createRentUseCase.execute(createRentUseCaseInputMock);

    expect(checksIfExistsWithPendingPaymentByUserSpy).toHaveBeenCalledTimes(1);
    expect(checksIfExistsWithPendingPaymentByUserSpy).toHaveBeenCalledWith({
      user_id: createRentUseCaseInputMock.user_id,
    });
  });

  it('should throw if CheckIfRentExistsWithPendingPaymentByUserRepository throws', async () => {
    jest
      .spyOn(
        checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
        'checkIfExistsWithPendingPaymentByUser'
      )
      .mockRejectedValueOnce(new Error());

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserHasOutstandingRentPaymentsError if user has rentals with outstanding payment', async () => {
    jest
      .spyOn(
        checkIfRentExistsWithPendingPaymentByUserRepositorySpy,
        'checkIfExistsWithPendingPaymentByUser'
      )
      .mockResolvedValueOnce(true);

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      UserHasOutstandingRentPaymentsError
    );
  });

  it('should call FindCarByIdRepository once with correct values', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    const findById = jest.spyOn(findCarByIdRepositorySpy, 'findById');

    const carId = faker.datatype.uuid();

    await createRentUseCase.execute({
      ...createRentUseCaseInputMock,
      car_id: carId,
    });

    expect(findById).toHaveBeenCalledTimes(1);
    expect(findById).toHaveBeenCalledWith({ id: carId });
  });

  it('should throw if FindCarByIdRepository throws', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarNotFoundWithThisIdError if car not exist', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should throw RentalStartDateIsInThePastError if start duration less than tomorrow', async () => {
    const startDate = faker.datatype.datetime();
    const expectedReturnDate = new Date(
      startDate.getTime() + minimumRentDurationTimeInMillissecondsMock
    );

    const edgeDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    jest.spyOn(Date, 'now').mockReturnValueOnce(edgeDate.getTime());

    const promise = createRentUseCase.execute({
      ...createRentUseCaseInputMock,
      start_date: startDate,
      expected_return_date: expectedReturnDate,
    });

    await expect(promise).rejects.toBeInstanceOf(
      RentalStartDateIsInThePastError
    );
  });

  it('should throw InvalidRentDurationTimeError if the rental duration is less than the defined minimum ', async () => {
    const startDate = faker.datatype.datetime();
    const expectedReturnDate = new Date(
      startDate.getTime() + minimumRentDurationTimeInMillissecondsMock - 1
    );

    setSafeStartDate(startDate);

    const promise = createRentUseCase.execute({
      ...createRentUseCaseInputMock,
      start_date: startDate,
      expected_return_date: expectedReturnDate,
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidRentDurationTimeError);
  });

  it('should call CheckIfRentExistsByOpenScheduleForCarRepository once with correct values', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    const checkIfExistsByOpenScheduleForCarSpy = jest.spyOn(
      checkIfRentExistsByOpenScheduleForCarRepositorySpy,
      'checkIfExistsByOpenScheduleForCar'
    );

    await createRentUseCase.execute(createRentUseCaseInputMock);

    expect(checkIfExistsByOpenScheduleForCarSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByOpenScheduleForCarSpy).toHaveBeenCalledWith({
      car_id: createRentUseCaseInputMock.car_id,
      start: createRentUseCaseInputMock.start_date,
      end: createRentUseCaseInputMock.expected_return_date,
    });
  });

  it('should throw if CheckIfRentExistsByOpenScheduleForCarRepository throws', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    jest
      .spyOn(
        checkIfRentExistsByOpenScheduleForCarRepositorySpy,
        'checkIfExistsByOpenScheduleForCar'
      )
      .mockRejectedValueOnce(new Error());

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarAlreadyBookedOnThisDateError if already exists a rent in this date for the car', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    jest
      .spyOn(
        checkIfRentExistsByOpenScheduleForCarRepositorySpy,
        'checkIfExistsByOpenScheduleForCar'
      )
      .mockResolvedValueOnce(true);

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      CarAlreadyBookedOnThisDateError
    );
  });

  it('should call CreateRentRepository once with correct values', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    const car = {
      ...carMock,
      daily_rate: faker.datatype.number(),
      fine_amout: faker.datatype.number(),
    };

    jest.spyOn(findCarByIdRepositorySpy, 'findById').mockResolvedValueOnce(car);

    const createSpy = jest.spyOn(createRentRepositorySpy, 'create');

    await createRentUseCase.execute(createRentUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      user_id: createRentUseCaseInputMock.user_id,
      car_id: createRentUseCaseInputMock.car_id,
      start_date: createRentUseCaseInputMock.start_date,
      expected_return_date: createRentUseCaseInputMock.expected_return_date,
      daily_rate: car.daily_rate,
      daily_late_fee: car.daily_late_fee,
    });
  });

  it('should throw if CreateRentRepository throws', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    jest
      .spyOn(createRentRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should return created rent on success', async () => {
    setSafeStartDate(createRentUseCaseInputMock.start_date);

    const rent = { ...rentMock };

    jest.spyOn(createRentRepositorySpy, 'create').mockResolvedValueOnce(rent);

    const response = await createRentUseCase.execute(
      createRentUseCaseInputMock
    );

    expect(response).toEqual(rent);
  });
});
