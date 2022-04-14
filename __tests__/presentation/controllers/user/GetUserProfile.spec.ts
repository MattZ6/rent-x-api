import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';
import { notFound, ok } from '@presentation/helpers/http';

import { userMock } from '../../../domain/models/user.mock';
import {
  getUserProfileControllerRequestMock,
  GetUserProfileUseCaseSpy,
} from '../../mocks';

let getUserProfileUseCaseSpy: GetUserProfileUseCaseSpy;

let getUserProfileController: GetUserProfileController;

describe('GetUserProfileController', () => {
  beforeEach(() => {
    getUserProfileUseCaseSpy = new GetUserProfileUseCaseSpy();

    getUserProfileController = new GetUserProfileController(
      getUserProfileUseCaseSpy
    );
  });

  it('should call GetUserProfileUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(getUserProfileUseCaseSpy, 'execute');

    await getUserProfileController.handle(getUserProfileControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: getUserProfileControllerRequestMock.user_id,
    });
  });

  it('should throw if GetUserProfileUseCase throws', async () => {
    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = getUserProfileController.handle(
      getUserProfileControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if GetUserProfileUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await getUserProfileController.handle(
      getUserProfileControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return ok (200) on success', async () => {
    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockResolvedValueOnce(userMock);

    const response = await getUserProfileController.handle(
      getUserProfileControllerRequestMock
    );

    expect(response).toEqual(ok(userMock));
  });
});
