interface ICheckIfUserExistsByEmailRepository {
  checkIfExistsByEmail(
    data: ICheckIfUserExistsByEmailRepository.Input
  ): Promise<ICheckIfUserExistsByEmailRepository.Output>;
}

namespace ICheckIfUserExistsByEmailRepository {
  export type Input = {
    email: string;
  };

  export type Output = boolean;
}

export { ICheckIfUserExistsByEmailRepository };
