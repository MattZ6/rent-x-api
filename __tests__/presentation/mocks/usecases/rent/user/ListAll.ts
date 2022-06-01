import type { IListAllUserRentalsUseCase } from '@domain/usecases/rent/user/ListAll';

import { makeRentMock } from '../../../../../domain';

export function makeListAllUserRentalsUseCaseOutputMock(): IListAllUserRentalsUseCase.Output {
  return [makeRentMock(), makeRentMock(), makeRentMock()];
}

export class ListAllUserRentalsUseCaseSpy
  implements IListAllUserRentalsUseCase
{
  async execute(
    _: IListAllUserRentalsUseCase.Input
  ): Promise<IListAllUserRentalsUseCase.Output> {
    return makeListAllUserRentalsUseCaseOutputMock();
  }
}
