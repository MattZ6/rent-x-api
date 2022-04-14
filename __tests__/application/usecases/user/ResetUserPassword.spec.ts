import { faker } from '@faker-js/faker';

import {
  UserTokenExpiredError,
  UserNotFoundWithProvidedIdError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';

import { ResetUserPasswordUseCase } from '@application/usecases/user/ResetUserPassword';

import { userTokenMock } from '../../../domain/models/user-token.mock';
import { userMock } from '../../../domain/models/user.mock';
import {
  DeleteUserTokenByIdRepositorySpy,
  FindUserByIdRepositorySpy,
  FindUserTokenByTokenRepositorySpy,
  GenerateHashProviderSpy,
  resetUserPasswordUseCaseInputMock,
  UpdateUserRepositorySpy,
} from '../../mocks';

let findUserTokenByTokenRepositorySpy: FindUserTokenByTokenRepositorySpy;
let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;
let deleteUserTokenByIdRepositorySpy: DeleteUserTokenByIdRepositorySpy;

let resetUserPasswordUseCase: ResetUserPasswordUseCase;

describe('ResetUserPasswordUseCase', () => {
  beforeEach(() => {
    findUserTokenByTokenRepositorySpy = new FindUserTokenByTokenRepositorySpy();
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();
    deleteUserTokenByIdRepositorySpy = new DeleteUserTokenByIdRepositorySpy();

    resetUserPasswordUseCase = new ResetUserPasswordUseCase(
      findUserTokenByTokenRepositorySpy,
      findUserByIdRepositorySpy,
      generateHashProviderSpy,
      updateUserRepositorySpy,
      deleteUserTokenByIdRepositorySpy
    );
  });

  it('should call FindUserTokenByTokenRepository once with correct values', async () => {
    const findByTokenSpy = jest.spyOn(
      findUserTokenByTokenRepositorySpy,
      'findByToken'
    );

    const token = faker.datatype.uuid();

    await resetUserPasswordUseCase.execute({
      ...resetUserPasswordUseCaseInputMock,
      token,
    });

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({ token });
  });

  it('should throw if FindUserTokenByTokenRepository throws', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(new Error());

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserTokenNotFoundWithThisTokenError if token not exists', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(undefined);

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      UserTokenNotFoundWithThisTokenError
    );
  });

  it('should throw UserTokenExpiredError if now is at least 1ms after token expiration date', async () => {
    const tokenExpiresIn = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: tokenExpiresIn });

    jest.spyOn(Date, 'now').mockReturnValueOnce(tokenExpiresIn.getTime() + 1);

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(UserTokenExpiredError);
  });

  it('should call FindUserByIdRepository once witch correct values', async () => {
    const userId = faker.datatype.uuid();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({
        ...userTokenMock,
        user_id: userId,
      });

    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    await resetUserPasswordUseCase.execute(resetUserPasswordUseCaseInputMock);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id: userId });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundWithThisIdError if user from token does not exists', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const newPassword = faker.internet.password();

    await resetUserPasswordUseCase.execute({
      ...resetUserPasswordUseCaseInputMock,
      new_password: newPassword,
    });

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith({ value: newPassword });
  });

  it('should throw if GenerateHashProvider throws', async () => {
    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(new Error());

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...userMock });

    const passwordHash = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(passwordHash);

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    await resetUserPasswordUseCase.execute(resetUserPasswordUseCaseInputMock);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      ...userMock,
      password_hash: passwordHash,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call DeleteUserTokenByIdRepository once with correct values', async () => {
    const userTokenId = faker.datatype.uuid();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, id: userTokenId });

    const deleteByIdSpy = jest.spyOn(
      deleteUserTokenByIdRepositorySpy,
      'deleteById'
    );

    await resetUserPasswordUseCase.execute(resetUserPasswordUseCaseInputMock);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: userTokenId });
  });

  it('should throw if DeleteUserTokenByIdRepository throws', async () => {
    jest
      .spyOn(deleteUserTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(new Error());

    const promise = resetUserPasswordUseCase.execute(
      resetUserPasswordUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should update user password', async () => {
    const user = { ...userMock };

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(user);

    const newPasswordHash = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(newPasswordHash);

    await resetUserPasswordUseCase.execute(resetUserPasswordUseCaseInputMock);

    expect(user.password_hash).toBe(newPasswordHash);
  });
});
