import { User } from '@domain/entities/User';

interface IUpdateUserPasswordUseCase {
  execute(
    data: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output>;
}

namespace IUpdateUserPasswordUseCase {
  export type Input = {
    id: string;
    old_password: string;
    new_password: string;
  };

  export type Output = User;
}

export { IUpdateUserPasswordUseCase };
