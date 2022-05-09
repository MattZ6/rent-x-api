import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';

import { UpdateUserEmailUseCase } from '@application/usecases/user/UpdateEmail';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  CheckIfUserExistsByEmailWithDifferentIdRepositorySpy,
  UpdateUserRepositorySpy,
  makeUpdateUserEmailUseCaseInputMock,
} from '../../mocks';

let checkIfUserExistsByEmailWithDifferentIdRepositorySpy: CheckIfUserExistsByEmailWithDifferentIdRepositorySpy;
let updateUserRepositorySpy: UpdateUserRepositorySpy;

let updateUserEmailUseCase: UpdateUserEmailUseCase;

describe('UpdateUserEmailUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByEmailWithDifferentIdRepositorySpy =
      new CheckIfUserExistsByEmailWithDifferentIdRepositorySpy();
    updateUserRepositorySpy = new UpdateUserRepositorySpy();

    updateUserEmailUseCase = new UpdateUserEmailUseCase(
      checkIfUserExistsByEmailWithDifferentIdRepositorySpy,
      updateUserRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByEmailWithDifferentIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByEmailWithDifferentIdRepositorySpy,
      'checkIfExistsByEmailWithDifferentId'
    );

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.id,
      email: input.email,
    });
  });

  it('should throw if CheckIfUserExistsByEmailWithDifferentIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfUserExistsByEmailWithDifferentIdRepositorySpy,
        'checkIfExistsByEmailWithDifferentId'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserAlreadyExistsWithProvidedEmailError if CheckIfUserExistsByEmailWithDifferentIdRepository returns true', async () => {
    jest
      .spyOn(
        checkIfUserExistsByEmailWithDifferentIdRepositorySpy,
        'checkIfExistsByEmailWithDifferentId'
      )
      .mockResolvedValueOnce(true);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithProvidedEmailError
    );
  });

  it('should call UpdateUserRepository once with correct values', async () => {
    const updateSpy = jest.spyOn(updateUserRepositorySpy, 'update');

    const input = makeUpdateUserEmailUseCaseInputMock();

    await updateUserEmailUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.id,
      email: input.email,
    });
  });

  it('should throw if UpdateUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const promise = updateUserEmailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the update user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(updateUserRepositorySpy, 'update')
      .mockResolvedValueOnce(userMock);

    const input = makeUpdateUserEmailUseCaseInputMock();

    const output = await updateUserEmailUseCase.execute(input);

    expect(output).toEqual(userMock);
  });
});
