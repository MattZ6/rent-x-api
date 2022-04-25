import {
  UserAlreadyExistsWithProvidedEmailError,
  UserAlreadyExistsWithProvidedDriverLicenseError,
} from '@domain/errors';

import { CreateAccountController } from '@presentation/controllers/user/Create';
import { badRequest, conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  CreateUserUseCaseSpy,
  makeCreateAccountControllerRequestMock,
  makeCreateUserUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let createUserUseCaseSpy: CreateUserUseCaseSpy;

let createAccountController: CreateAccountController;

describe('CreateAccountController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    createUserUseCaseSpy = new CreateUserUseCaseSpy();

    createAccountController = new CreateAccountController(
      validationSpy,
      createUserUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeCreateAccountControllerRequestMock();

    await createAccountController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeCreateAccountControllerRequestMock();

    const promise = createAccountController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call CreateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createUserUseCaseSpy, 'execute');

    const request = makeCreateAccountControllerRequestMock();

    await createAccountController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      driver_license: request.body.driver_license,
      email: request.body.email,
      password: request.body.password,
    });
  });

  it('should throw if CreateUserUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateAccountControllerRequestMock();

    const promise = createAccountController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithProvidedEmailError', async () => {
    const errorMock = new UserAlreadyExistsWithProvidedEmailError();

    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithProvidedDriverLicenseError', async () => {
    const errorMock = new UserAlreadyExistsWithProvidedDriverLicenseError();

    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const outputMock = makeCreateUserUseCaseOutputMock();

    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
