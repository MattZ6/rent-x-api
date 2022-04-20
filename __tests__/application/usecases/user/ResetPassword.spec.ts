import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';

import { ResetUserPasswordUseCase } from '@application/usecases/user/ResetPassword';

import { makeErrorMock, makeUserTokenMock } from '../../../domain';
import {
  FindUserTokenByTokenRepositorySpy,
  GenerateHashProviderSpy,
  UpdateUserRepositorySpy,
  DeleteUserTokenByIdRepositorySpy,
  makeResetUserPasswordUseCaseInputMock,
  makeGenerateHashProviderOutputMock,
} from '../../mocks';

let findUserTokenByTokenRepositorySpy: FindUserTokenByTokenRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;
let deleteUserTokenByIdRepositorySpy: DeleteUserTokenByIdRepositorySpy;

let resetUserPasswordUseCase: ResetUserPasswordUseCase;

describe('ResetUserPasswordUseCase', () => {
  beforeEach(() => {
    findUserTokenByTokenRepositorySpy = new FindUserTokenByTokenRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();
    deleteUserTokenByIdRepositorySpy = new DeleteUserTokenByIdRepositorySpy();

    resetUserPasswordUseCase = new ResetUserPasswordUseCase(
      findUserTokenByTokenRepositorySpy,
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

    const input = makeResetUserPasswordUseCaseInputMock();

    await resetUserPasswordUseCase.execute(input);

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({ token: input.token });
  });

  it('should throw if FindUserTokenByTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(errorMock);

    const input = makeResetUserPasswordUseCaseInputMock();

    const promise = resetUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserTokenNotFoundWithProvidedTokenError if FindUserTokenByTokenRepository returns null', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(null);

    const input = makeResetUserPasswordUseCaseInputMock();

    const promise = resetUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserTokenNotFoundWithProvidedTokenError
    );
  });

  it('should throw UserTokenExpiredError if now is at least 1ms after token expiration date', async () => {
    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(userTokenMock.expires_in.getTime() + 1);

    const input = makeResetUserPasswordUseCaseInputMock();

    const promise = resetUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(UserTokenExpiredError);
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const input = makeResetUserPasswordUseCaseInputMock();

    await resetUserPasswordUseCase.execute(input);

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith({ value: input.new_password });
  });

  it('should throw if GenerateHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(errorMock);

    const input = makeResetUserPasswordUseCaseInputMock();

    const promise = resetUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    const generateHashProviderOutputMock = makeGenerateHashProviderOutputMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(generateHashProviderOutputMock);

    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeResetUserPasswordUseCaseInputMock();

    await resetUserPasswordUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: userTokenMock.user_id,
      password_hash: generateHashProviderOutputMock,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeResetUserPasswordUseCaseInputMock();

    const promise = resetUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call DeleteUserTokenByIdRepository once with correct values', async () => {
    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    const deleteByIdSpy = jest.spyOn(
      deleteUserTokenByIdRepositorySpy,
      'deleteById'
    );

    const input = makeResetUserPasswordUseCaseInputMock();

    await resetUserPasswordUseCase.execute(input);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: userTokenMock.id });
  });

  it('should throw if DeleteUserTokenByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteUserTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(errorMock);

    const input = makeResetUserPasswordUseCaseInputMock();

    const promise = resetUserPasswordUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
