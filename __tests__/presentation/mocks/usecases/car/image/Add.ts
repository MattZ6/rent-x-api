import { IAddImagesToCarUseCase } from '@domain/usecases/car/image/Add';

import { makeCarImageMock } from '../../../../../domain';

export function makeAddImagesToCarUseCaseOutputMock(): IAddImagesToCarUseCase.Output {
  return [makeCarImageMock()];
}

export class AddImagesToCarUseCaseSpy implements IAddImagesToCarUseCase {
  async execute(
    _: IAddImagesToCarUseCase.Input
  ): Promise<IAddImagesToCarUseCase.Output> {
    return makeAddImagesToCarUseCaseOutputMock();
  }
}
