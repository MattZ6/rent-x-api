import { ListAllAvailableCarsController } from '@presentation/controllers/car/ListAllAvailable';
import { CarMapper } from '@presentation/dtos';
import { badRequest, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ListAllAvailableCarsUseCaseSpy,
  makeListAllAvailableCarsControllerRequestMock,
  makeListAllAvailableCarsUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let listAllAvailableCarsUseCaseSpy: ListAllAvailableCarsUseCaseSpy;

let listAllAvailableCarsController: ListAllAvailableCarsController;

describe('ListAllAvailableCarsController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    listAllAvailableCarsUseCaseSpy = new ListAllAvailableCarsUseCaseSpy();

    listAllAvailableCarsController = new ListAllAvailableCarsController(
      validationSpy,
      listAllAvailableCarsUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeListAllAvailableCarsControllerRequestMock();

    await listAllAvailableCarsController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeListAllAvailableCarsControllerRequestMock();

    const promise = listAllAvailableCarsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeListAllAvailableCarsControllerRequestMock();

    const response = await listAllAvailableCarsController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call ListAllAvailableCarsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllAvailableCarsUseCaseSpy, 'execute');

    const request = makeListAllAvailableCarsControllerRequestMock();

    await listAllAvailableCarsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
      brand_id: request.query.brand_id,
      category_id: request.query.category_id,
      search: request.query.search,
      min_daily_rate: request.query.min_daily_rate,
      max_daily_rate: request.query.max_daily_rate,
      start_date: request.query.start_date,
      end_date: request.query.end_date,
      type_of_fuel: request.query.type_of_fuel,
      transmission_type: request.query.transmission_type,
    });
  });

  it('should throw if ListAllAvailableCarsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllAvailableCarsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllAvailableCarsControllerRequestMock();

    const promise = listAllAvailableCarsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllAvailableCarsUseCaseOutputMock();

    jest
      .spyOn(listAllAvailableCarsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllAvailableCarsControllerRequestMock();

    const response = await listAllAvailableCarsController.handle(request);

    expect(response).toEqual(ok(CarMapper.toListItemsDTO(outputMock)));
  });
});
