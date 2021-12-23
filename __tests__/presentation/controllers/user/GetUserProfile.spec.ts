import faker from 'faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';
import { notFound, ok } from '@presentation/helpers/http/http';

import { userMock } from '../../../domain/models/user.mock';
import { GetUserProfileUseCaseSpy } from '../../mocks';

let getUserProfileUseCaseSpy: GetUserProfileUseCaseSpy;

let getUserProfileController: GetUserProfileController;

const getUserProfileControllerRequest: GetUserProfileController.Request = {
  user_id: faker.datatype.uuid(),
};

describe('GetUserProfileController', () => {
  beforeEach(() => {
    getUserProfileUseCaseSpy = new GetUserProfileUseCaseSpy();

    getUserProfileController = new GetUserProfileController(
      getUserProfileUseCaseSpy
    );
  });

  it('should call GetUserProfileUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(getUserProfileUseCaseSpy, 'execute');

    await getUserProfileController.handle(getUserProfileControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: getUserProfileControllerRequest.user_id,
    });
  });

  it('should throw if GetUserProfileUseCase throws', async () => {
    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = getUserProfileController.handle(
      getUserProfileControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if GetUserProfileUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await getUserProfileController.handle(
      getUserProfileControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return ok (200) on success', async () => {
    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockResolvedValueOnce(userMock);

    const response = await getUserProfileController.handle(
      getUserProfileControllerRequest
    );

    expect(response).toEqual(ok(userMock));
  });
});
