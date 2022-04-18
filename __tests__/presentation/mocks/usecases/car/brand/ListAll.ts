import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

export class ListAllCarBrandsUseCaseSpy implements IListAllCarBrandsUseCase {
  async execute(
    _: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output> {
    return [];
  }
}
