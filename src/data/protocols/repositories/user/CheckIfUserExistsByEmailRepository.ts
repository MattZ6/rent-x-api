export interface ICheckIfUserExistsByEmailRepository {
  checkIfExistsByEmail(email: string): Promise<boolean>;
}
