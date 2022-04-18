import { faker } from '@faker-js/faker';

import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserAvatarUseCase } from '@application/usecases/user/UpdateAvatar';

import { makeUserAvatar } from '../../../domain/models';
import {
  CheckIfUserExistsByIdRepositorySpy,
  CreateUserAvatarRepositorySpy,
  FindUserAvatarByIdRepositorySpy,
  makeUpdateUserAvatarUseCaseAvatarPathMock,
  makeUpdateUserAvatarUseCaseInputMock,
  StoreFileProviderSpy,
  UpdateUserAvatarRepositorySpy,
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
    const error = new Error(faker.datatype.string());

    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(error);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should throw UserNotFoundWithThisIdError if user not exists', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(undefined);

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
    expect(findByIdSpy).toHaveBeenCalledWith({ id: input.user_id });
  });

  it('should throw if FindUserAvatarByIdRepository throws', async () => {
    const error = new Error(faker.datatype.string());

    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(error);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should call UpdateUserAvatarRepository once with correct values once the avatar exists', async () => {
    const userAvatar = makeUserAvatar();

    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userAvatar);

    const updateSpy = jest.spyOn(updateUserAvatarRepositorySpy, 'update');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      ...userAvatar,
      original_name: input.file.name,
      mime_type: input.file.type,
      extension: input.file.extension,
      size_in_bytes: input.file.size,
    });
  });

  it('should not call UpdateUserAvatarRepository if the user avatar not exists', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const updateSpy = jest.spyOn(updateUserAvatarRepositorySpy, 'update');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('should throw if UpdateUserAvatarRepository throws', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(makeUserAvatar());

    const error = new Error(faker.datatype.string());

    jest
      .spyOn(updateUserAvatarRepositorySpy, 'update')
      .mockRejectedValueOnce(error);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should call CreateUserAvatarRepository once with correct values once the avatar not exists', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const createSpy = jest.spyOn(createUserAvatarRepositorySpy, 'create');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      id: input.user_id,
      original_name: input.file.name,
      mime_type: input.file.type,
      extension: input.file.extension,
      size_in_bytes: input.file.size,
    });
  });

  it('should not call CreateUserAvatarRepository if the user avatar exists', async () => {
    const userAvatar = makeUserAvatar();

    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userAvatar);

    const createSpy = jest.spyOn(createUserAvatarRepositorySpy, 'create');

    const input = makeUpdateUserAvatarUseCaseInputMock();

    await updateUserAvatarUseCase.execute(input);

    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should throw if CreateUserAvatarRepository throws', async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const error = new Error(faker.datatype.string());

    jest
      .spyOn(createUserAvatarRepositorySpy, 'create')
      .mockRejectedValueOnce(error);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
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
    const error = new Error(faker.datatype.string());

    jest.spyOn(storeFileProviderSpy, 'store').mockRejectedValueOnce(error);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const promise = updateUserAvatarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(error);
  });

  it("should return a new avatar if the user doesn't have one previously", async () => {
    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const userAvatar = makeUserAvatar();

    jest
      .spyOn(createUserAvatarRepositorySpy, 'create')
      .mockResolvedValueOnce(userAvatar);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const response = await updateUserAvatarUseCase.execute(input);

    expect(response).toEqual(userAvatar);
  });

  it('should return a update avatar if the user have one previously', async () => {
    const userAvatar = makeUserAvatar();

    jest
      .spyOn(findUserAvatarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userAvatar);

    const input = makeUpdateUserAvatarUseCaseInputMock();

    const response = await updateUserAvatarUseCase.execute(input);

    expect(response).toEqual({
      ...userAvatar,
      original_name: input.file.name,
      extension: input.file.extension,
      size_in_bytes: input.file.size,
      mime_type: input.file.type,
    });
  });
});
