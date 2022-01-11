import faker from 'faker';

import {
  CarNotFoundWithThisIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
  UserHasOutstandingRentPaymentsError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { ICreateRentUseCase } from '@domain/usecases/rent/CreateRent';

import { CreateRentUseCase } from '@data/usecases/rent/CreateRent';

import { carMock } from '../../../domain/models/car.mock';
import { rentMock } from '../../../domain/models/rent.mock';
import {
  CheckIfRentExistsByOpenScheduleForCarRepositorySpy,
  CheckIfUserExistsByIdRepositorySpy,
  CheckIfRentExistsWithPendingPaymentByUserRepositorySpy,
  CreateRentRepositorySpy,
  FindCarByIdRepositorySpy,
} from '../../mocks';

let checkIfUserExistsByIdRepositorySpy: CheckIfUserExistsByIdRepositorySpy;
let checkIfRentExistsWithPendingPaymentByUserRepositorySpy: CheckIfRentExistsWithPendingPaymentByUserRepositorySpy;
let findCarByIdRepositorySpy: FindCarByIdRepositorySpy;
const minimumDurationTimeInMillisseconds = faker.datatype.number({
  min: 60_000,
  max: 60_000_000,
});
let checkIfRentExistsByOpenScheduleForCarRepositorySpy: CheckIfRentExistsByOpenScheduleForCarRepositorySpy;
let createRentRepositorySpy: CreateRentRepositorySpy;

let createRentUseCase: CreateRentUseCase;

const start = faker.datatype.datetime();

const createRentUseCaseInputMock: ICreateRentUseCase.Input = {
  user_id: faker.datatype.uuid(),
  car_id: faker.datatype.uuid(),
  start_date: start,
  expected_return_date: new Date(
    start.getTime() + minimumDurationTimeInMillisseconds
  ),
};

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
      minimumDurationTimeInMillisseconds,
      checkIfRentExistsByOpenScheduleForCarRepositorySpy,
      createRentRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
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

    await expect(promise).rejects.toBeInstanceOf(UserNotFoundWithThisIdError);
  });

  it('should call CheckIfRentExistsWithPendingPaymentByUserRepository once with correct values', async () => {
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

    await expect(promise).rejects.toBeInstanceOf(CarNotFoundWithThisIdError);
  });

  it('should throw InvalidRentDurationTimeError if the rental duration is less than the defined minimum ', async () => {
    const startDate = faker.datatype.datetime();
    const expectedReturnDate = new Date(
      startDate.getTime() + minimumDurationTimeInMillisseconds - 1
    );

    const promise = createRentUseCase.execute({
      ...createRentUseCaseInputMock,
      start_date: startDate,
      expected_return_date: expectedReturnDate,
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidRentDurationTimeError);
  });

  it('should call CheckIfRentExistsByOpenScheduleForCarRepository once with correct values', async () => {
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
    jest
      .spyOn(createRentRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createRentUseCase.execute(createRentUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should return created rent on success', async () => {
    const rent = { ...rentMock };

    jest.spyOn(createRentRepositorySpy, 'create').mockResolvedValueOnce(rent);

    const response = await createRentUseCase.execute(
      createRentUseCaseInputMock
    );

    expect(response).toEqual(rent);
  });
});
