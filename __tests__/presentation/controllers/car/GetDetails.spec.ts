import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';
import { notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  GetCarDetailsUseCaseSpy,
  makeGetCarDetailsControllerRequestMock,
  makeGetCarDetailsUseCaseOutputMock,
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

    const request = makeGetCarDetailsControllerRequestMock();

    await getCarDetailsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenLastCalledWith({ id: request.params.id });
  });

  it('should throw if GetCarDetailsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const promise = getCarDetailsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if GetCarDetailsUseCase throws CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const result = await getCarDetailsController.handle(request);

    expect(result).toEqual(notFound(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeGetCarDetailsUseCaseOutputMock();

    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const result = await getCarDetailsController.handle(request);

    expect(result).toEqual(ok(outputMock));
  });
});
