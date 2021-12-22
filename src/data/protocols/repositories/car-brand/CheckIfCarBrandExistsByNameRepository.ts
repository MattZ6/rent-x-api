export interface ICheckIfCarBrandExistsByNameRepository {
  checkIfExistsByName(name: string): Promise<boolean>;
}
