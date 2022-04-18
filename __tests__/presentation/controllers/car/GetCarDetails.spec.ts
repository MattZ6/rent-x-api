import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarDetailsController } from '@presentation/controllers/car/GetCarDetails';
import { notFound, ok } from '@presentation/helpers/http';

import { carMock } from '../../../domain/models/car.mock';
import {
  getCarDetailsControllerRequestMock,
  GetCarDetailsUseCaseSpy,
} from '../../mocks';

let getCarDetailsUseCaseSpy: GetCarDetailsUseCaseSpy;

let getCarDetailsController: GetCarDetailsController;

describe('GetCarDetailsController', () => {
  beforeEach(() => {
    getCarDetailsUseCaseSpy = new GetCarDetailsUseCaseSpy();

    getCarDetailsController = new GetCarDetailsController(
      getCarDetailsUseCaseSpy
    );
  });

  it('should call GetCarDetailsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(getCarDetailsUseCaseSpy, 'execute');

    await getCarDetailsController.handle(getCarDetailsControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenLastCalledWith({
      car_id: getCarDetailsControllerRequestMock.params.id,
    });
  });

  it('should throw if GetCarDetailsUseCase throws', async () => {
    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = getCarDetailsController.handle(
      getCarDetailsControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if GetCarDetailsUseCase throws CarNotFoundWithThisIdError', async () => {
    const error = new CarNotFoundWithProvidedIdError();

    jest.spyOn(getCarDetailsUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const result = await getCarDetailsController.handle(
      getCarDetailsControllerRequestMock
    );

    expect(result).toEqual(notFound(error));
  });

  it('should return ok (200) on success', async () => {
    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(carMock);

    const result = await getCarDetailsController.handle(
      getCarDetailsControllerRequestMock
    );

    expect(result).toEqual(ok(carMock));
  });
});
