import { internalServerError } from '@presentation/helpers/http';

import { ControllerErrorHandlerDecorator } from '@main/decorators/ControllerErrorHandler';

import { SaveErrorRepositorySpy } from '../../application/mocks';
import { makeErrorMock } from '../../domain';
import {
  ControllerSpy,
  makeControllerHttpRequestMock,
  makeControllerHttpResponseMock,
} from '../mocks';

let controllerSpy: ControllerSpy;
let saveErrorRepositorySpy: SaveErrorRepositorySpy;

let controllerErrorHandlerDecorator: ControllerErrorHandlerDecorator;

describe('ControllerErrorHandlerDecorator', () => {
  beforeEach(() => {
    controllerSpy = new ControllerSpy();
    saveErrorRepositorySpy = new SaveErrorRepositorySpy();

    controllerErrorHandlerDecorator = new ControllerErrorHandlerDecorator(
      controllerSpy,
      saveErrorRepositorySpy
    );
  });

  it('should call Controller once with correct values', async () => {
    const handleSpy = jest.spyOn(controllerSpy, 'handle');

    const request = makeControllerHttpRequestMock();

    await controllerErrorHandlerDecorator.handle(request);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  it('should call SaveErrorRepository once with correct values on error', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(controllerSpy, 'handle').mockRejectedValueOnce(errorMock);

    const saveSpy = jest.spyOn(saveErrorRepositorySpy, 'save');

    const request = makeControllerHttpRequestMock();

    await controllerErrorHandlerDecorator.handle(request);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith({
      stack: errorMock.stack,
      thrown_at: controllerSpy.constructor.name,
      resource_uri: request.original_url,
      http_method: request.method,
    });
  });

  it('should call SaveErrorRepository with default stack if error not have a stack', async () => {
    const errorMock = makeErrorMock();

    errorMock.stack = undefined;

    jest.spyOn(controllerSpy, 'handle').mockRejectedValueOnce(errorMock);

    const saveSpy = jest.spyOn(saveErrorRepositorySpy, 'save');

    const request = makeControllerHttpRequestMock();

    await controllerErrorHandlerDecorator.handle(request);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith({
      stack: 'NO STACK PROVIDED',
      thrown_at: controllerSpy.constructor.name,
      resource_uri: request.original_url,
      http_method: request.method,
    });
  });

  it('should return internal server error (500) if Controller throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(controllerSpy, 'handle').mockRejectedValueOnce(errorMock);

    const request = makeControllerHttpRequestMock();

    const response = await controllerErrorHandlerDecorator.handle(request);

    expect(response).toEqual(internalServerError(errorMock));
  });

  it('should return same Controller response on success ', async () => {
    const responseMock = makeControllerHttpResponseMock();

    jest.spyOn(controllerSpy, 'handle').mockResolvedValueOnce(responseMock);

    const request = makeControllerHttpRequestMock();

    const response = await controllerErrorHandlerDecorator.handle(request);

    expect(response).toEqual(responseMock);
  });
});
