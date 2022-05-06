import { internalServerError } from '@presentation/helpers/http';

import { MiddlewareErrorHandlerDecorator } from '@main/decorators/MiddlewareErrorHandler';

import { SaveErrorRepositorySpy } from '../../application/mocks';
import { makeErrorMock } from '../../domain';
import {
  MiddlewareSpy,
  makeMiddlewareHttpRequestMock,
  makeMiddlewareHttpResponseMock,
} from '../mocks';

let middlewareSpy: MiddlewareSpy;
let saveErrorRepositorySpy: SaveErrorRepositorySpy;

let middlewareErrorHandlerDecorator: MiddlewareErrorHandlerDecorator;

describe('MiddlewareErrorHandlerDecorator', () => {
  beforeEach(() => {
    middlewareSpy = new MiddlewareSpy();
    saveErrorRepositorySpy = new SaveErrorRepositorySpy();

    middlewareErrorHandlerDecorator = new MiddlewareErrorHandlerDecorator(
      middlewareSpy,
      saveErrorRepositorySpy
    );
  });

  it('should call Middleware once with correct values', async () => {
    const handleSpy = jest.spyOn(middlewareSpy, 'handle');

    const request = makeMiddlewareHttpRequestMock();

    await middlewareErrorHandlerDecorator.handle(request);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  it('should call SaveErrorRepository once with correct values on error', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(middlewareSpy, 'handle').mockRejectedValueOnce(errorMock);

    const saveSpy = jest.spyOn(saveErrorRepositorySpy, 'save');

    const request = makeMiddlewareHttpRequestMock();

    await middlewareErrorHandlerDecorator.handle(request);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith({
      stack: errorMock.stack,
      thrown_at: middlewareSpy.constructor.name,
      resource_uri: request.original_url,
      http_method: request.method,
    });
  });

  it('should call SaveErrorRepository with default stack if error not have a stack', async () => {
    const errorMock = makeErrorMock();

    errorMock.stack = undefined;

    jest.spyOn(middlewareSpy, 'handle').mockRejectedValueOnce(errorMock);

    const saveSpy = jest.spyOn(saveErrorRepositorySpy, 'save');

    const request = makeMiddlewareHttpRequestMock();

    await middlewareErrorHandlerDecorator.handle(request);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith({
      stack: 'NO STACK PROVIDED',
      thrown_at: middlewareSpy.constructor.name,
      resource_uri: request.original_url,
      http_method: request.method,
    });
  });

  it('should return internal server error (500) if Middleware throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(middlewareSpy, 'handle').mockRejectedValueOnce(errorMock);

    const request = makeMiddlewareHttpRequestMock();

    const response = await middlewareErrorHandlerDecorator.handle(request);

    expect(response).toEqual(internalServerError(errorMock));
  });

  it('should return same Middleware response on success ', async () => {
    const responseMock = makeMiddlewareHttpResponseMock();

    jest.spyOn(middlewareSpy, 'handle').mockResolvedValueOnce(responseMock);

    const request = makeMiddlewareHttpRequestMock();

    const response = await middlewareErrorHandlerDecorator.handle(request);

    expect(response).toEqual(responseMock);
  });
});
