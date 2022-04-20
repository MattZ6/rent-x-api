import {
  UserAlreadyExistsWithProvidedDriverLicenseError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';

import { CreateUserUseCase } from '@application/usecases/user/Create';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  CheckIfUserExistsByDriverLicenseRepositorySpy,
  CheckIfUserExistsByEmailRepositorySpy,
  CreateUserRepositorySpy,
  GenerateHashProviderSpy,
  makeCreateUserUseCaseInputMock,
  makeGenerateHashProviderOutputMock,
} from '../../mocks';

let checkIfUserExistsByEmailRepositorySpy: CheckIfUserExistsByEmailRepositorySpy;
let checkIfUserExistsByDriverLicenseRepositorySpy: CheckIfUserExistsByDriverLicenseRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let createUserRepositorySpy: CreateUserRepositorySpy;

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByEmailRepositorySpy =
      new CheckIfUserExistsByEmailRepositorySpy();
    checkIfUserExistsByDriverLicenseRepositorySpy =
      new CheckIfUserExistsByDriverLicenseRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    createUserRepositorySpy = new CreateUserRepositorySpy();

    createUserUseCase = new CreateUserUseCase(
      checkIfUserExistsByEmailRepositorySpy,
      checkIfUserExistsByDriverLicenseRepositorySpy,
      generateHashProviderSpy,
      createUserRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByEmailRepository once with correct values', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
      checkIfUserExistsByEmailRepositorySpy,
      'checkIfExistsByEmail'
    );

    const input = makeCreateUserUseCaseInputMock();

    await createUserUseCase.execute(input);

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith({
      email: input.email,
    });
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateUserUseCaseInputMock();

    const promise = createUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserAlreadyExistsWithProvidedEmailError if CheckIfUserExistsByEmailRepository returns true', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockResolvedValueOnce(true);

    const input = makeCreateUserUseCaseInputMock();

    const promise = createUserUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithProvidedEmailError
    );
  });

  it('should call CheckIfUserExistsByDriverLicenseRepository once with correct values', async () => {
    const checkIfExistsByDriverLicenseSpy = jest.spyOn(
      checkIfUserExistsByDriverLicenseRepositorySpy,
      'checkIfExistsByDriverLicense'
    );

    const input = makeCreateUserUseCaseInputMock();

    await createUserUseCase.execute(input);

    expect(checkIfExistsByDriverLicenseSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByDriverLicenseSpy).toHaveBeenCalledWith({
      driver_license: input.driver_license,
    });
  });

  it('should throw if CheckIfUserExistsByDriverLicenseRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfUserExistsByDriverLicenseRepositorySpy,
        'checkIfExistsByDriverLicense'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateUserUseCaseInputMock();

    const promise = createUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserAlreadyExistsWithProvidedDriverLicenseError if CheckIfUserExistsByDriverLicenseRepository returns true', async () => {
    jest
      .spyOn(
        checkIfUserExistsByDriverLicenseRepositorySpy,
        'checkIfExistsByDriverLicense'
      )
      .mockResolvedValueOnce(true);

    const input = makeCreateUserUseCaseInputMock();

    const promise = createUserUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithProvidedDriverLicenseError
    );
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const input = makeCreateUserUseCaseInputMock();

    await createUserUseCase.execute(input);

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith({ value: input.password });
  });

  it('should throw if GenerateHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateUserUseCaseInputMock();

    const promise = createUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserRepository once with correct values', async () => {
    const generateHashProviderOutputMock = makeGenerateHashProviderOutputMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(generateHashProviderOutputMock);

    const createSpy = jest.spyOn(createUserRepositorySpy, 'create');

    const input = makeCreateUserUseCaseInputMock();

    await createUserUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: input.name,
      role: 'DRIVER',
      driver_license: input.driver_license,
      email: input.email,
      password_hash: generateHashProviderOutputMock,
    });
  });

  it('should throw if CreateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateUserUseCaseInputMock();

    const promise = createUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return a new user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(createUserRepositorySpy, 'create')
      .mockResolvedValueOnce(userMock);

    const input = makeCreateUserUseCaseInputMock();

    const output = await createUserUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
