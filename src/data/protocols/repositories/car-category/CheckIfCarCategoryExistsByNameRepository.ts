export interface ICheckIfCarCategoryExistsByNameRepository {
  checkIfExistsByName(name: string): Promise<boolean>;
}
