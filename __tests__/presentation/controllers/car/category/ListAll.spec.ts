import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';
import { badRequest, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllCarCategoriesUseCaseSpy,
  makeListAllCarCategoriesControllerRequestMock,
  makeListAllCarCategoriesUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let listAllCarCategoriesUseCaseSpy: ListAllCarCategoriesUseCaseSpy;

let listAllCarCategoriesController: ListAllCarCategoriesController;

describe('ListAllCarCategoriesController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    listAllCarCategoriesUseCaseSpy = new ListAllCarCategoriesUseCaseSpy();

    listAllCarCategoriesController = new ListAllCarCategoriesController(
      validationSpy,
      listAllCarCategoriesUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeListAllCarCategoriesControllerRequestMock();

    await listAllCarCategoriesController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeListAllCarCategoriesControllerRequestMock();

    const promise = listAllCarCategoriesController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeListAllCarCategoriesControllerRequestMock();

    const response = await listAllCarCategoriesController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call ListAllCarCategoriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    const request = makeListAllCarCategoriesControllerRequestMock();

    await listAllCarCategoriesController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
    });
  });

  it('should throw if ListAllCarCategoriesUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllCarCategoriesControllerRequestMock();

    const promise = listAllCarCategoriesController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllCarCategoriesUseCaseOutputMock();

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllCarCategoriesControllerRequestMock();

    const response = await listAllCarCategoriesController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
