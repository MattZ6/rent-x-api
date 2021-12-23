export interface ICheckIfCarCategoryExistsByIdRepository {
  checkIfExistsById(id: string): Promise<boolean>;
}
