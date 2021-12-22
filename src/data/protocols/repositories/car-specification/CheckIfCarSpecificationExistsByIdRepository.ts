export interface ICheckIfCarSpecificationExistsByIdRepository {
  checkIfExistsById(id: string): Promise<boolean>;
}
