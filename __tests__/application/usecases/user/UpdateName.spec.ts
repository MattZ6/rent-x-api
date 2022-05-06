import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserNameUseCase } from '@application/usecases/user/UpdateName';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  CheckIfUserExistsByIdRepositorySpy,
  UpdateUserRepositorySpy,
  makeUpdateUserNameUseCaseInputMock,
} from '../../mocks';

let checkIfUserExistsByIdRepositorySpy: CheckIfUserExistsByIdRepositorySpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;

let updateUserNameUseCase: UpdateUserNameUseCase;

describe('UpdateUserNameUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByIdRepositorySpy =
      new CheckIfUserExistsByIdRepositorySpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();

    updateUserNameUseCase = new UpdateUserNameUseCase(
      checkIfUserExistsByIdRepositorySpy,
      updateUserRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeUpdateUserNameUseCaseInputMock();

    await updateUserNameUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.id,
    });
  });

  it('should throw if CheckIfUserExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserNameUseCaseInputMock();

    const promise = updateUserNameUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if CheckIfUserExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeUpdateUserNameUseCaseInputMock();

    const promise = updateUserNameUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserNameUseCaseInputMock();

    await updateUserNameUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.id,
      name: input.name,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserNameUseCaseInputMock();

    const promise = updateUserNameUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the update user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserNameUseCaseInputMock();

    const output = await updateUserNameUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
