export interface IDeleteCarSpecificationByIdRepository {
  deleteById(id: string): Promise<void>;
}
