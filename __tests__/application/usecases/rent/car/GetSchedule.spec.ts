import { faker } from '@faker-js/faker';

import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarScheduleUseCase } from '@application/usecases/rent/car/GetSchedule';

import { makeErrorMock, makeRentMock } from '../../../../domain';
import {
  CheckIfCarExistsByIdRepositorySpy,
  FindAllRentsFromCarRepositorySpy,
  makeGetCarScheduleUseCaseInputMock,
} from '../../../mocks';

let checkIfCarExistsByIdRepositorySpy: CheckIfCarExistsByIdRepositorySpy;
let findAllRentsFromCarRepositorySpy: FindAllRentsFromCarRepositorySpy;

let getCarScheduleUseCase: GetCarScheduleUseCase;

describe('GetCarScheduleUseCase', () => {
  beforeEach(() => {
    checkIfCarExistsByIdRepositorySpy = new CheckIfCarExistsByIdRepositorySpy();
    findAllRentsFromCarRepositorySpy = new FindAllRentsFromCarRepositorySpy();

    getCarScheduleUseCase = new GetCarScheduleUseCase(
      checkIfCarExistsByIdRepositorySpy,
      findAllRentsFromCarRepositorySpy
    );
  });

  it('should call CheckIfCarExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeGetCarScheduleUseCaseInputMock();

    await getCarScheduleUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.car_id,
    });
  });

  it('should throw if CheckIfCarExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeGetCarScheduleUseCaseInputMock();

    const promise = getCarScheduleUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarNotFoundWithProvidedIdError if CheckIfCarExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeGetCarScheduleUseCaseInputMock();

    const promise = getCarScheduleUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should call FindAllRentsFromCarRepository once with correct values', async () => {
    const nowMock = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(nowMock.getTime());

    const findAllFromCarSpy = jest.spyOn(
      findAllRentsFromCarRepositorySpy,
      'findAllFromCar'
    );

    const input = makeGetCarScheduleUseCaseInputMock();

    const start = new Date(
      nowMock.getUTCFullYear(),
      nowMock.getUTCMonth(),
      nowMock.getUTCDate()
    );

    await getCarScheduleUseCase.execute(input);

    expect(findAllFromCarSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromCarSpy).toHaveBeenCalledWith({
      car_id: input.car_id,
      start,
    });
  });

  it('should throw if FindAllRentsFromCarRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllRentsFromCarRepositorySpy, 'findAllFromCar')
      .mockRejectedValueOnce(errorMock);

    const input = makeGetCarScheduleUseCaseInputMock();

    const promise = getCarScheduleUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Rents on success', async () => {
    const rentsMock = [
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
    ];

    jest
      .spyOn(findAllRentsFromCarRepositorySpy, 'findAllFromCar')
      .mockResolvedValueOnce(rentsMock);

    const input = makeGetCarScheduleUseCaseInputMock();

    const output = await getCarScheduleUseCase.execute(input);

    expect(output).toEqual(rentsMock);
  });
});
