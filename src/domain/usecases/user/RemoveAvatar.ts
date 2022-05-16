interface IRemoveUserAvatarUseCase {
  execute(
    data: IRemoveUserAvatarUseCase.Input
  ): Promise<IRemoveUserAvatarUseCase.Output>;
}

namespace IRemoveUserAvatarUseCase {
  export type Input = {
    user_id: string;
  };

  export type Output = void;
}

export { IRemoveUserAvatarUseCase };
