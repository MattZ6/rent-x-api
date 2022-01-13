import { ReturnRentController } from '@presentation/controllers/rent/ReturnRent';

import {
  returnRentControllerRequestMock,
  ReturnRentUseCaseSpy,
} from '../../mocks';

let returnRentUseCaseSpy: ReturnRentUseCaseSpy;

let returnRentController: ReturnRentController;

describe('ReturnRentController', () => {
  beforeEach(() => {
    returnRentUseCaseSpy = new ReturnRentUseCaseSpy();

    returnRentController = new ReturnRentController(returnRentUseCaseSpy);
  });

  it('should call ReturnRentUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(returnRentUseCaseSpy, 'execute');

    await returnRentController.handle(returnRentControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      rent_id: returnRentControllerRequestMock.params.id,
      user_id: returnRentControllerRequestMock.user_id,
    });
  });
});
