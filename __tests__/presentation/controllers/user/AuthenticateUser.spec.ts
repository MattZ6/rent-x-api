import { faker } from '@faker-js/faker';

import {
  IncorrectPassword,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';
import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import {
  authenticateUserControllerRequestMock,
  AuthenticateUserUseCaseSpy,
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

    await authenticateUserController.handle(
      authenticateUserControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      email: authenticateUserControllerRequestMock.body.email,
      password: authenticateUserControllerRequestMock.body.password,
    });
  });

  it('should throw if AuthenticateUserUseCase throws', async () => {
    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserController.handle(
      authenticateUserControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if AuthenticateUserUseCase throws UserNotFoundWithThisEmailError', async () => {
    const error = new UserNotFoundWithThisEmailError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await authenticateUserController.handle(
      authenticateUserControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if AuthenticateUserUseCase throws IncorrectPassword', async () => {
    const error = new IncorrectPassword();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await authenticateUserController.handle(
      authenticateUserControllerRequestMock
    );

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return ok (200) on success', async () => {
    const authentication: IAuthenticateUserUseCase.Output = {
      access_token: faker.datatype.string(),
      refresh_token: faker.datatype.string(),
    };

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockResolvedValueOnce(authentication);

    const response = await authenticateUserController.handle(
      authenticateUserControllerRequestMock
    );

    expect(response).toEqual(ok(authentication));
  });
});
