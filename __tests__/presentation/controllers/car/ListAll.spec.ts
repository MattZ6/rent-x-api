import { ListAllCarsController } from '@presentation/controllers/car/ListAll';
import { CarMapper } from '@presentation/dtos';
import { badRequest, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ListAllCarsUseCaseSpy,
  makeListAllCarsControllerRequestMock,
  makeListAllCarsUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let listAllCarsUseCaseSpy: ListAllCarsUseCaseSpy;

let listAllCarsController: ListAllCarsController;

describe('ListAllCarsController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    listAllCarsUseCaseSpy = new ListAllCarsUseCaseSpy();

    listAllCarsController = new ListAllCarsController(
      validationSpy,
      listAllCarsUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeListAllCarsControllerRequestMock();

    await listAllCarsController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeListAllCarsControllerRequestMock();

    const promise = listAllCarsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeListAllCarsControllerRequestMock();

    const response = await listAllCarsController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call ListAllCarsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    const request = makeListAllCarsControllerRequestMock();

    await listAllCarsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
      brand_id: request.query.brand_id,
      category_id: request.query.category_id,
    });
  });

  it('should throw if ListAllCarsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllCarsControllerRequestMock();

    const promise = listAllCarsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllCarsUseCaseOutputMock();

    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllCarsControllerRequestMock();

    const response = await listAllCarsController.handle(request);

    expect(response).toEqual(ok(CarMapper.toListItemsDTO(outputMock)));
  });
});
