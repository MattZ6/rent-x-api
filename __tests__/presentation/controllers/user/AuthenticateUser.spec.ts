import faker from 'faker';

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
} from '@presentation/helpers/http/http';

import { AuthenticateUserUseCaseSpy } from '../../mocks';

let authenticateUserUseCaseSpy: AuthenticateUserUseCaseSpy;

let authenticateUserController: AuthenticateUserController;

const authenticateUserControllerRequest: AuthenticateUserController.Request = {
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
};

describe('AuthenticateUserController', () => {
  beforeEach(() => {
    authenticateUserUseCaseSpy = new AuthenticateUserUseCaseSpy();

    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCaseSpy
    );
  });

  it('should call AuthenticateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(authenticateUserUseCaseSpy, 'execute');

    await authenticateUserController.handle(authenticateUserControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      email: authenticateUserControllerRequest.body.email,
      password: authenticateUserControllerRequest.body.password,
    });
  });

  it('should throw if AuthenticateUserUseCase throws', async () => {
    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserController.handle(
      authenticateUserControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if AuthenticateUserUseCase throws UserNotFoundWithThisEmailError', async () => {
    const error = new UserNotFoundWithThisEmailError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await authenticateUserController.handle(
      authenticateUserControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if AuthenticateUserUseCase throws IncorrectPassword', async () => {
    const error = new IncorrectPassword();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await authenticateUserController.handle(
      authenticateUserControllerRequest
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
      authenticateUserControllerRequest
    );

    expect(response).toEqual(ok(authentication));
  });
});
