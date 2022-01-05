import faker from 'faker';

import {
  UserAlreadyExistsWithThisDriverLicenseError,
  UserAlreadyExistsWithThisEmailError,
} from '@domain/errors';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { conflict, created } from '@presentation/helpers/http/http';

import { userMock } from '../../../domain/models/user.mock';
import { CreateUserUseCaseSpy } from '../../mocks';

let createUserUseCaseSpy: CreateUserUseCaseSpy;

let createAccountController: CreateAccountController;

const createAccountControllerRequest: CreateAccountController.Request = {
  body: {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    driver_license: faker.datatype.string(),
  },
};

describe('CreateAccountController', () => {
  beforeEach(() => {
    createUserUseCaseSpy = new CreateUserUseCaseSpy();

    createAccountController = new CreateAccountController(createUserUseCaseSpy);
  });

  it('should call CreateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createUserUseCaseSpy, 'execute');

    await createAccountController.handle(createAccountControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createAccountControllerRequest.body.name,
      driver_license: createAccountControllerRequest.body.driver_license,
      email: createAccountControllerRequest.body.email,
      password: createAccountControllerRequest.body.password,
    });
  });

  it('should throw if CreateUserUseCase throws', async () => {
    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createAccountController.handle(
      createAccountControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithThisEmailError', async () => {
    const error = new UserAlreadyExistsWithThisEmailError();

    jest.spyOn(createUserUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createAccountController.handle(
      createAccountControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithThisDriverLicenseError', async () => {
    const error = new UserAlreadyExistsWithThisDriverLicenseError();

    jest.spyOn(createUserUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createAccountController.handle(
      createAccountControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    jest.spyOn(createUserUseCaseSpy, 'execute').mockResolvedValueOnce(userMock);

    const response = await createAccountController.handle(
      createAccountControllerRequest
    );

    expect(response).toEqual(created<void>());
  });
});
