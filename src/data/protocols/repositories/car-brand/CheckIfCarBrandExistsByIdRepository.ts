export interface ICheckIfCarBrandExistsByIdRepository {
  checkIfExistsById(id: string): Promise<boolean>;
}
