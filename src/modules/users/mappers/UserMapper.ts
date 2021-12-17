import { instanceToInstance } from 'class-transformer';

import { User } from '../infra/typeorm/entities/User';

interface IUserProfileDTO {
  id: string;
  name: string;
  email: string;
  avatar_url(): string;
  driver_license: string;
}

export abstract class UserMap {
  static toProfileDTO(user: User): IUserProfileDTO {
    const profile = instanceToInstance({
      id: user.id,
      name: user.name,
      email: user.email,
      driver_license: user.driver_license,
      avatar_url: user.avatar_url,
    });

    return profile;
  }
}
