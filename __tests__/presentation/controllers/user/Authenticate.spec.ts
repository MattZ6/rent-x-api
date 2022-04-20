import {
  UserNotFoundWithProvidedEmailError,
  WrongPasswordError,
} from '@domain/errors';

import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';
import { notFound, unprocessableEntity, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  AuthenticateUserUseCaseSpy,
  makeAuthenticateUserControllerRequestMock,
  makeAuthenticateUserUseCaseOutputMock,
} from '../../mocks';

let authenticateUserUseCaseSpy: AuthenticateUserUseCaseSpy;

let authenticateUserController: AuthenticateUserController;

describe('AuthenticateUserController', () => {
  beforeEach(() => {
    authenticateUserUseCaseSpy = new AuthenticateUserUseCaseSpy();

    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCaseSpy
    );
  });

  it('should call AuthenticateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(authenticateUserUseCaseSpy, 'execute');

    const request = makeAuthenticateUserControllerRequestMock();

    await authenticateUserController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      email: request.body.email,
      password: request.body.password,
    });
  });

  it('should throw if AuthenticateUserUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAuthenticateUserControllerRequestMock();

    const promise = authenticateUserController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if AuthenticateUserUseCase throws UserNotFoundWithProvidedEmailError', async () => {
    const errorMock = new UserNotFoundWithProvidedEmailError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAuthenticateUserControllerRequestMock();

    const response = await authenticateUserController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if AuthenticateUserUseCase throws WrongPasswordError', async () => {
    const errorMock = new WrongPasswordError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAuthenticateUserControllerRequestMock();

    const response = await authenticateUserController.handle(request);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeAuthenticateUserUseCaseOutputMock();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeAuthenticateUserControllerRequestMock();

    const response = await authenticateUserController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
