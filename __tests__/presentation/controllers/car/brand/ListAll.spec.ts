import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';
import { ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllCarBrandsUseCaseSpy,
  makeListAllCarBrandsControllerRequestMock,
  makeListAllCarBrandsUseCaseOutputMock,
} from '../../../mocks';

let listAllCarBrandsUseCaseSpy: ListAllCarBrandsUseCaseSpy;

let listAllCarBrandsController: ListAllCarBrandsController;

describe('ListAllCarBrandsController', () => {
  beforeEach(() => {
    listAllCarBrandsUseCaseSpy = new ListAllCarBrandsUseCaseSpy();

    listAllCarBrandsController = new ListAllCarBrandsController(
      listAllCarBrandsUseCaseSpy
    );
  });

  it('should call ListAllCarBrandsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    const request = makeListAllCarBrandsControllerRequestMock();

    await listAllCarBrandsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
    });
  });

  it('should throw if ListAllCarBrandsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllCarBrandsControllerRequestMock();

    const promise = listAllCarBrandsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllCarBrandsUseCaseOutputMock();

    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllCarBrandsControllerRequestMock();

    const response = await listAllCarBrandsController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
