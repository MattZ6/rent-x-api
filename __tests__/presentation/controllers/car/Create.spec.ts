import {
  CarAlreadyExistsWithProvidedLicensePlateError,
  CarBrandNotFoundWithProvidedIdError,
  CarCategoryNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';

import { CreateCarController } from '@presentation/controllers/car/Create';
import { conflict, created, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  CreateCarUseCaseSpy,
  makeCreateCarControllerRequestMock,
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

    const request = makeCreateCarControllerRequestMock();

    await createCarController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      description: request.body.description,
      license_plate: request.body.license_plate,
      daily_rate: request.body.daily_rate,
      daily_late_fee: request.body.daily_late_fee,
      brand_id: request.body.brand_id,
      category_id: request.body.category_id,
      horse_power: request.body.horse_power,
      max_speed: request.body.max_speed,
      number_of_seats: request.body.number_of_seats,
      zero_to_one_hundred_in_millisseconds:
        request.body.zero_to_one_hundred_in_millisseconds,
      transmission_type: request.body.transmission_type,
      type_of_fuel: request.body.type_of_fuel,
      specifications_ids: request.body.specifications_ids,
    });
  });

  it('should throw if CreateCarUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(errorMock);

    const request = makeCreateCarControllerRequestMock();

    const promise = createCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateCarUseCase throws CarAlreadyExistsWithProvidedLicensePlateError', async () => {
    const errorMock = new CarAlreadyExistsWithProvidedLicensePlateError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(errorMock);

    const request = makeCreateCarControllerRequestMock();

    const response = await createCarController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return not found (404) if CreateCarUseCase throws CarBrandNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarBrandNotFoundWithProvidedIdError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(errorMock);

    const request = makeCreateCarControllerRequestMock();

    const response = await createCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if CreateCarUseCase throws CarCategoryNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarCategoryNotFoundWithProvidedIdError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(errorMock);

    const request = makeCreateCarControllerRequestMock();

    const response = await createCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if CreateCarUseCase throws OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError', async () => {
    const errorMock =
      new OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError();

    jest.spyOn(createCarUseCaseSpy, 'execute').mockRejectedValueOnce(errorMock);

    const request = makeCreateCarControllerRequestMock();

    const response = await createCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateCarControllerRequestMock();

    const response = await createCarController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
