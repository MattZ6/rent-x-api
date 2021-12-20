export interface IDeleteUserTokenByIdRepository {
  deleteById(id: string): Promise<void>;
}
