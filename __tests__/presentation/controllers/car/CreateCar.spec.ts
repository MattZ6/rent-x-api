import {
  CarAlreadyExistsWithThisLicensePlateError,
  CarBrandNotFoundWithProvidedIdError,
  CarCategoryNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsNotFoundWithThisIdsError,
} from '@domain/errors';

import { CreateCarController } from '@presentation/controllers/car/CreateCar';
import { conflict, created, notFound } from '@presentation/helpers/http';

import {
  createCarControllerRequestMock,
  CreateCarUseCaseSpy,
} from '../../mocks';

let createCarUseCaseSpy: CreateCarUseCaseSpy;

let createCarController: CreateCarController;

describe('CreateCarController', () => {
  beforeEach(() => {
    createCarUseCaseSpy = new CreateCarUseCaseSpy();

    createCarController = new CreateCarController(createCarUseCaseSpy);
  });

  it('should call CreateCarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarUseCaseSpy, 'execute');

    await createCarController.handle(createCarControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarControllerRequestMock.body.name,
      description: createCarControllerRequestMock.body.description,
      license_plate: createCarControllerRequestMock.body.license_plate,
      daily_rate: createCarControllerRequestMock.body.daily_rate,
      daily_late_fee: createCarControllerRequestMock.body.daily_late_fee,
      brand_id: createCarControllerRequestMock.body.brand_id,
      category_id: createCarControllerRequestMock.body.category_id,
      horse_power: createCarControllerRequestMock.body.horse_power,
      max_speed: createCarControllerRequestMock.body.max_speed,
      number_of_seats: createCarControllerRequestMock.body.number_of_seats,
      zero_to_one_hundred_in_millisseconds:
        createCarControllerRequestMock.body
          .zero_to_one_hundred_in_millisseconds,
      transmission_type: createCarControllerRequestMock.body.transmission_type,
      type_of_fuel: createCarControllerRequestMock.body.type_of_fuel,
      specifications_ids:
        createCarControllerRequestMock.body.specifications_ids,
    });
  });

  it('should throw if CreateCarUseCase throws', async () => {
    jest
      .spyOn(createCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarController.handle(createCarControllerRequestMock);

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarUseCase throws CarAlreadyExistsWithThisLicensePlateError', async () => {
    const error = new CarAlreadyExistsWithThisLicensePlateError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return not found (404) if CreateCarUseCase throws CarBrandNotFoundWithThisIdError', async () => {
    const error = new CarBrandNotFoundWithProvidedIdError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return not found (404) if CreateCarUseCase throws CarCategoryNotFoundWithThisIdError', async () => {
    const error = new CarCategoryNotFoundWithProvidedIdError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return not found (404) if CreateCarUseCase throws OneOrMoreCarSpecificationsNotFoundWithThisIdsError', async () => {
    const error = new OneOrMoreCarSpecificationsNotFoundWithThisIdsError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createCarController.handle(
      createCarControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarController.handle(
      createCarControllerRequestMock
    );

    expect(response).toEqual(created<void>());
  });
});
