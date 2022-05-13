import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors';

import { UpdateUserPasswordUseCase } from '@application/usecases/user/UpdatePassword';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  CompareHashProviderSpy,
  FindUserByIdRepositorySpy,
  GenerateHashProviderSpy,
  makeGenerateHashProviderOutputMock,
  makeUpdateUserPasswordUseCaseInputMock,
  UpdateUserRepositorySpy,
} from '../../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;

let updateUserPasswordUseCase: UpdateUserPasswordUseCase;

describe('UpdateUserPasswordUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();

    updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      findUserByIdRepositorySpy,
      compareHashProviderSpy,
      generateHashProviderSpy,
      updateUserRepositorySpy
    );
  });

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.id });
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if FindUserByIdRepository returns null', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(compareSpy).toHaveBeenCalledWith({
      value: input.old_password,
      hashed_value: userMock.password_hash,
    });
    expect(compareSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CompareHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw WrongPasswordError if CompareHashProvider returns false', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(hashSpy).toHaveBeenCalledWith({ value: input.new_password });
    expect(hashSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const generateHashOutputMock = makeGenerateHashProviderOutputMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(generateHashOutputMock);

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserPasswordUseCaseInputMock();

    await updateUserPasswordUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledWith({
      id: input.id,
      password_hash: generateHashOutputMock,
    });
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const promise = updateUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return User on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserPasswordUseCaseInputMock();

    const output = await updateUserPasswordUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
