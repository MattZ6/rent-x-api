import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { makeCarBrandMock } from '../../../../../domain';

export function makeListAllCarBrandsUseCaseOutputMock(): IListAllCarBrandsUseCase.Output {
  return [makeCarBrandMock(), makeCarBrandMock(), makeCarBrandMock()];
}

export class ListAllCarBrandsUseCaseSpy implements IListAllCarBrandsUseCase {
  async execute(
    _: IListAllCarBrandsUseCase.Input
  ): Promise<IListAllCarBrandsUseCase.Output> {
    return makeListAllCarBrandsUseCaseOutputMock();
  }
}
