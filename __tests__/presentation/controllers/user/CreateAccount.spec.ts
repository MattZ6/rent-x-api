import {
  UserAlreadyExistsWithThisDriverLicenseError,
  UserAlreadyExistsWithThisEmailError,
} from '@domain/errors';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { conflict, created } from '@presentation/helpers/http';

import { userMock } from '../../../domain/models/user.mock';
import {
  createAccountControllerRequestMock,
  CreateUserUseCaseSpy,
} from '../../mocks';

let createUserUseCaseSpy: CreateUserUseCaseSpy;

let createAccountController: CreateAccountController;

describe('CreateAccountController', () => {
  beforeEach(() => {
    createUserUseCaseSpy = new CreateUserUseCaseSpy();

    createAccountController = new CreateAccountController(createUserUseCaseSpy);
  });

  it('should call CreateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createUserUseCaseSpy, 'execute');

    await createAccountController.handle(createAccountControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createAccountControllerRequestMock.body.name,
      driver_license: createAccountControllerRequestMock.body.driver_license,
      email: createAccountControllerRequestMock.body.email,
      password: createAccountControllerRequestMock.body.password,
    });
  });

  it('should throw if CreateUserUseCase throws', async () => {
    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createAccountController.handle(
      createAccountControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithThisEmailError', async () => {
    const error = new UserAlreadyExistsWithThisEmailError();

    jest.spyOn(createUserUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createAccountController.handle(
      createAccountControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithThisDriverLicenseError', async () => {
    const error = new UserAlreadyExistsWithThisDriverLicenseError();

    jest.spyOn(createUserUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createAccountController.handle(
      createAccountControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    jest.spyOn(createUserUseCaseSpy, 'execute').mockResolvedValueOnce(userMock);

    const response = await createAccountController.handle(
      createAccountControllerRequestMock
    );

    expect(response).toEqual(created<void>());
  });
});
