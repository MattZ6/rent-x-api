import faker from 'faker';

import {
  CarAlreadyExistsWithThisLicensePlateError,
  CarBrandNotFoundWithThisIdError,
  CarCategoryNotFoundWithThisIdError,
  OneOrMoreCarSpecificationsNotFoundWithThisIdsError,
} from '@domain/errors';
import { TransmissionTypeEnum, TypeOfFuelEnum } from '@domain/models/Car';

import { CreateCarController } from '@presentation/controllers/car/CreateCar';
import { conflict, created, notFound } from '@presentation/helpers/http/http';

import { CreateCarUseCaseSpy } from '../../mocks';

let createCarUseCaseSpy: CreateCarUseCaseSpy;

let createCarController: CreateCarController;

const createCarControllerRequest: CreateCarController.Request = {
  body: {
    name: faker.datatype.string(),
    description: faker.datatype.string(),
    brand_id: faker.datatype.uuid(),
    category_id: faker.datatype.uuid(),
    daily_rate: faker.datatype.number(),
    fine_amount: faker.datatype.number(),
    license_plate: faker.datatype.string(),
    horse_power: faker.datatype.number({ max: 10_000, min: 100 }),
    max_speed: faker.datatype.number({ min: 100, max: 360 }),
    number_of_seats: faker.datatype.number({ min: 1, max: 7 }),
    zero_to_one_hundred_in_millisseconds: faker.datatype.float({
      min: 2,
      max: 15,
    }),
    transmission_type: faker.random.arrayElement([
      TransmissionTypeEnum.MANUAL,
      TransmissionTypeEnum.AUTO,
    ]),
    type_of_fuel: faker.random.arrayElement([
      TypeOfFuelEnum.ALCOHOL,
      TypeOfFuelEnum.ELETRICITY,
      TypeOfFuelEnum.GAS,
    ]),
    specifications_ids: [faker.datatype.uuid(), faker.datatype.uuid()],
  },
};

describe('CreateCarController', () => {
  beforeEach(() => {
    createCarUseCaseSpy = new CreateCarUseCaseSpy();

    createCarController = new CreateCarController(createCarUseCaseSpy);
  });

  it('should call CreateCarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarUseCaseSpy, 'execute');

    await createCarController.handle(createCarControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarControllerRequest.body.name,
      description: createCarControllerRequest.body.description,
      license_plate: createCarControllerRequest.body.license_plate,
      daily_rate: createCarControllerRequest.body.daily_rate,
      fine_amount: createCarControllerRequest.body.fine_amount,
      brand_id: createCarControllerRequest.body.brand_id,
      category_id: createCarControllerRequest.body.category_id,
      horse_power: createCarControllerRequest.body.horse_power,
      max_speed: createCarControllerRequest.body.max_speed,
      number_of_seats: createCarControllerRequest.body.number_of_seats,
      zero_to_one_hundred_in_millisseconds:
        createCarControllerRequest.body.zero_to_one_hundred_in_millisseconds,
      transmission_type: createCarControllerRequest.body.transmission_type,
      type_of_fuel: createCarControllerRequest.body.type_of_fuel,
      specifications_ids: createCarControllerRequest.body.specifications_ids,
    });
  });

  it('should throw if CreateCarUseCase throws', async () => {
    jest
      .spyOn(createCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarController.handle(createCarControllerRequest);

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarUseCase throws CarAlreadyExistsWithThisLicensePlateError', async () => {
    const error = new CarAlreadyExistsWithThisLicensePlateError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return not found (404) if CreateCarUseCase throws CarBrandNotFoundWithThisIdError', async () => {
    const error = new CarBrandNotFoundWithThisIdError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return not found (404) if CreateCarUseCase throws CarCategoryNotFoundWithThisIdError', async () => {
    const error = new CarCategoryNotFoundWithThisIdError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return not found (404) if CreateCarUseCase throws OneOrMoreCarSpecificationsNotFoundWithThisIdsError', async () => {
    const error = new OneOrMoreCarSpecificationsNotFoundWithThisIdsError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarController.handle(
      createCarControllerRequest
    );

    expect(response).toEqual(created<void>());
  });
});
