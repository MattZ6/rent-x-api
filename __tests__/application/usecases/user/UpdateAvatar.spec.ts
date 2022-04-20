import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserAvatarUseCase } from '@application/usecases/user/UpdateAvatar';

import { makeErrorMock, makeUserAvatarMock } from '../../../domain';
import {
  CheckIfUserExistsByIdRepositorySpy,
  FindUserAvatarByIdRepositorySpy,
  UpdateUserAvatarRepositorySpy,
  CreateUserAvatarRepositorySpy,
  StoreFileProviderSpy,
  makeUpdateUserAvatarUseCaseAvatarPathMock,
  makeUpdateUserAvatarUseCaseInputMock,
} from '../../mocks';

let checkIfUserExistsByIdRepositorySpy: CheckIfUserExistsByIdRepositorySpy;
let findUserAvatarByIdRepositorySpy: FindUserAvatarByIdRepositorySpy;
let updateUserAvatarRepositorySpy: UpdateUserAvatarRepositorySpy;
let createUserAvatarRepositorySpy: CreateUserAvatarRepositorySpy;
let storeFileProviderSpy: StoreFileProviderSpy;
const avatarPath = makeUpdateUserAvatarUseCaseAvatarPathMock();

let updateUserAvatarUseCase: UpdateUserAvatarUseCase;

describe('UpdateUserAvatarUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByIdRepositorySpy =
      new CheckIfUserExistsByIdRepositorySpy();
    findUserAvatarByIdRepositorySpy = new FindUserAvatarByIdRepositorySpy();
    updateUserAvatarRepositorySpy = new UpdateUserAvatarRepositorySpy();
    createUserAvatarRepositorySpy = new CreateUserAvatarRepositorySpy();
    storeFileProviderSpy = new StoreFileProviderSpy();

    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      checkIfUserExistsByIdRepositorySpy,
      findUserAvatarByIdRepositorySpy,
      updateUserAvatarRepositorySpy,
      createUserAvatarRepositorySpy,
      storeFileProviderSpy,
      avatarPath
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if CheckIfUserExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if CheckIfUserExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call FindUserAvatarByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserAvatarByIdRepositorySpy, 'findById');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ user_id: input.user_id });
  });

  it('should throw if FindUserAvatarByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call UpdateUserAvatarRepository once with correct values once if FindUserAvatarByIdRepository returns a user avatar', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(makeUserAvatarMock());

    const updateSpy = jest.spyOn(updateUserAvatarRepositorySpy, 'update');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
      original_name: input.file.name,
      mime_type: input.file.type,
      extension: input.file.extension,
      size_in_bytes: input.file.size,
    });
  });

  it('should not call UpdateUserAvatarRepository if FindUserAvatarByIdRepository returns null', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const updateSpy = jest.spyOn(updateUserAvatarRepositorySpy, 'update');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('should throw if UpdateUserAvatarRepository throws', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(makeUserAvatarMock());

    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserAvatarRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserAvatarRepository once with correct values once if FindUserAvatarByIdRepository returns null', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const createSpy = jest.spyOn(createUserAvatarRepositorySpy, 'create');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
      original_name: input.file.name,
      mime_type: input.file.type,
      extension: input.file.extension,
      size_in_bytes: input.file.size,
    });
  });

  it('should not call CreateUserAvatarRepository if FindUserAvatarByIdRepository returns a user avatar', async () => {
    const userAvatarMock = makeUserAvatarMock();

    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userAvatarMock);

    const createSpy = jest.spyOn(createUserAvatarRepositorySpy, 'create');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should throw if CreateUserAvatarRepository throws', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserAvatarRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call StoreFileProvider once with correct values', async () => {
    const storeSpy = jest.spyOn(storeFileProviderSpy, 'store');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(storeSpy).toHaveBeenCalledWith({
      file_name: input.user_id,
      folder_path: avatarPath,
      content: input.file.content,
    });
  });

  it('should throw if StoreFileProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(storeFileProviderSpy, 'store').mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it("should return a new avatar if the user doesn't have one previously", async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const userAvatarMock = makeUserAvatarMock();

    jest
      .spyOn(createUserAvatarRepositorySpy, 'create')
      .mockResolvedValueOnce(userAvatarMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const output = await updateUserAvatarUseCase.execute(input);

    expect(output).toEqual(userAvatarMock);
  });

  it('should return a updated avatar if the user have one previously', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(makeUserAvatarMock());

    const userAvatarMock = makeUserAvatarMock();

    jest
      .spyOn(updateUserAvatarRepositorySpy, 'update')
      .mockResolvedValueOnce(userAvatarMock);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const output = await updateUserAvatarUseCase.execute(input);

    expect(output).toEqual(userAvatarMock);
  });
});
