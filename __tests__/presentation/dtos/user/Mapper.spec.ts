import { UserMapper } from '@presentation/dtos';

import { makeUserAvatarMock, makeUserMock } from '../../../domain';

describe('UserMapper', () => {
  it('should return profile DTO', () => {
    const userMock = makeUserMock();

    const output = UserMapper.toProfileDTO(userMock);

    expect(output).toEqual({
      id: userMock.id,
      name: userMock.name,
      driver_license: userMock.driver_license,
      email: userMock.email,
      avatar_url: undefined,
    });
  });

  it('should return profile DTO with avatar', () => {
    const userMock = makeUserMock();
    const userAvatarMock = makeUserAvatarMock();

    const output = UserMapper.toProfileDTO({
      ...userMock,
      avatar: userAvatarMock,
    });

    expect(output).toEqual({
      id: userMock.id,
      name: userMock.name,
      driver_license: userMock.driver_license,
      email: userMock.email,
      avatar_url: userAvatarMock.user_id,
    });
  });
});
