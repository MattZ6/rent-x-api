import { User } from '@domain/entities/User';
import { UserAvatar } from '@domain/entities/UserAvatar';

export namespace UserMapper {
  type Input = User & {
    avatar?: UserAvatar;
  };

  export type UserProfile = {
    id: string;
    name: string;
    driver_license: string;
    email: string;
    avatar_url?: string;
  };

  export function toProfileDTO(data: Input): UserMapper.UserProfile {
    let avatar_url: string;

    if (data.avatar) {
      // TODO: Adicionar a URL base
      avatar_url = data.avatar.user_id;
    }

    return {
      id: data.id,
      name: data.name,
      driver_license: data.driver_license,
      email: data.email,
      avatar_url,
    };
  }
}
