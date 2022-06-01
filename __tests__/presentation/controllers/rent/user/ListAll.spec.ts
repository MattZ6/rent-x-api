import { ListAllUserRentalsController } from '@presentation/controllers/rent/user/ListAll';
import { badRequest, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllUserRentalsUseCaseSpy,
  makeListAllUserRentalsControllerRequestMock,
  makeListAllUserRentalsUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let listAllUserRentalsUseCaseSpy: ListAllUserRentalsUseCaseSpy;

let listAllUserRentalsController: ListAllUserRentalsController;

describe('ListAllUserRentalsController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    listAllUserRentalsUseCaseSpy = new ListAllUserRentalsUseCaseSpy();

    listAllUserRentalsController = new ListAllUserRentalsController(
      validationSpy,
      listAllUserRentalsUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeListAllUserRentalsControllerRequestMock();

    await listAllUserRentalsController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeListAllUserRentalsControllerRequestMock();

    const promise = listAllUserRentalsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeListAllUserRentalsControllerRequestMock();

    const response = await listAllUserRentalsController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call ListAllUserRentalsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllUserRentalsUseCaseSpy, 'execute');

    const request = makeListAllUserRentalsControllerRequestMock();

    await listAllUserRentalsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      limit: request.query.limit,
      offset: request.query.offset,
      user_id: request.user.id,
    });
  });

  it('should throw if ListAllUserRentalsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllUserRentalsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllUserRentalsControllerRequestMock();

    const promise = listAllUserRentalsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllUserRentalsUseCaseOutputMock();

    jest
      .spyOn(listAllUserRentalsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllUserRentalsControllerRequestMock();

    const response = await listAllUserRentalsController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
