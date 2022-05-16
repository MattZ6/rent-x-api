import {
  UserAvatarNotFoundWithProvidedUserIdError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';

import { RemoveUserAvatarUseCase } from '@application/usecases/user/RemoveAvatar';

import { makeErrorMock } from '../../../domain';
import {
  CheckIfUserAvatarExistsByUserIdRepositorySpy,
  CheckIfUserExistsByIdRepositorySpy,
  DeleteFileProviderSpy,
  DeleteUserAvatarByUserIdRepositorySpy,
} from '../../mocks';
import {
  makeRemoveUserAvatarUseCaseAvatarPathMock,
  makeRemoveUserAvatarUseCaseInputMock,
} from '../../mocks/usecases/user/RemoveAvatar';

let checkIfUserExistsByIdRepositorySpy: CheckIfUserExistsByIdRepositorySpy;
let checkIfUserAvatarExistsByUserIdRepositorySpy: CheckIfUserAvatarExistsByUserIdRepositorySpy;
let deleteFileProviderSpy: DeleteFileProviderSpy;
let avatarFolderPathMock: string;
let deleteUserAvatarByUserIdRepositorySpy: DeleteUserAvatarByUserIdRepositorySpy;

let removeUserAvatarUseCase: RemoveUserAvatarUseCase;

describe('RemoveUserAvatarUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByIdRepositorySpy =
      new CheckIfUserExistsByIdRepositorySpy();
    checkIfUserAvatarExistsByUserIdRepositorySpy =
      new CheckIfUserAvatarExistsByUserIdRepositorySpy();
    deleteFileProviderSpy = new DeleteFileProviderSpy();
    avatarFolderPathMock = makeRemoveUserAvatarUseCaseAvatarPathMock();
    deleteUserAvatarByUserIdRepositorySpy =
      new DeleteUserAvatarByUserIdRepositorySpy();

    removeUserAvatarUseCase = new RemoveUserAvatarUseCase(
      checkIfUserExistsByIdRepositorySpy,
      checkIfUserAvatarExistsByUserIdRepositorySpy,
      deleteFileProviderSpy,
      avatarFolderPathMock,
      deleteUserAvatarByUserIdRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeRemoveUserAvatarUseCaseInputMock();

    await removeUserAvatarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfUserExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveUserAvatarUseCaseInputMock();

    const promise = removeUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if CheckIfUserExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeRemoveUserAvatarUseCaseInputMock();

    const promise = removeUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfUserAvatarExistsByUserIdRepository once with correct values', async () => {
    const checkIfExistsByUserIdSpy = jest.spyOn(
      checkIfUserAvatarExistsByUserIdRepositorySpy,
      'checkIfExistsByUserId'
    );

    const input = makeRemoveUserAvatarUseCaseInputMock();

    await removeUserAvatarUseCase.execute(input);

    expect(checkIfExistsByUserIdSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
    });
    expect(checkIfExistsByUserIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if CheckIfUserAvatarExistsByUserIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfUserAvatarExistsByUserIdRepositorySpy,
        'checkIfExistsByUserId'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveUserAvatarUseCaseInputMock();

    const promise = removeUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserAvatarNotFoundWithProvidedUserIdError if CheckIfUserAvatarExistsByUserIdRepository returns false', async () => {
    jest
      .spyOn(
        checkIfUserAvatarExistsByUserIdRepositorySpy,
        'checkIfExistsByUserId'
      )
      .mockResolvedValueOnce(false);

    const input = makeRemoveUserAvatarUseCaseInputMock();

    const promise = removeUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserAvatarNotFoundWithProvidedUserIdError
    );
  });

  it('should call DeleteFileProvider once with correct values', async () => {
    const deleteSpy = jest.spyOn(deleteFileProviderSpy, 'delete');

    const input = makeRemoveUserAvatarUseCaseInputMock();

    await removeUserAvatarUseCase.execute(input);

    expect(deleteSpy).toHaveBeenCalledWith({
      file_name: input.user_id,
      folder_path: avatarFolderPathMock,
    });
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if DeleteFileProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteFileProviderSpy, 'delete')
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveUserAvatarUseCaseInputMock();

    const promise = removeUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call DeleteUserAvatarByUserIdRepository once with correct values', async () => {
    const deleteByUserIdSpy = jest.spyOn(
      deleteUserAvatarByUserIdRepositorySpy,
      'deleteByUserId'
    );

    const input = makeRemoveUserAvatarUseCaseInputMock();

    await removeUserAvatarUseCase.execute(input);

    expect(deleteByUserIdSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
    });
    expect(deleteByUserIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if DeleteUserAvatarByUserIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteUserAvatarByUserIdRepositorySpy, 'deleteByUserId')
      .mockRejectedValueOnce(errorMock);

    const input = makeRemoveUserAvatarUseCaseInputMock();

    const promise = removeUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
