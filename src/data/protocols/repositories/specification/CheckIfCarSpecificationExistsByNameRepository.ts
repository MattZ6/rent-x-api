export interface ICheckIfCarSpecificationExistsByNameRepository {
  checkIfExistsByName(name: string): Promise<boolean>;
}
