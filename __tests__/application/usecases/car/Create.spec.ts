import { faker } from '@faker-js/faker';

import {
  CarAlreadyExistsWithProvidedLicensePlateError,
  CarBrandNotFoundWithProvidedIdError,
  CarCategoryNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';

import { CreateCarUseCase } from '@application/usecases/car/Create';

import {
  makeCarMock,
  makeCarSpecificationMock,
  makeErrorMock,
} from '../../../domain';
import {
  CheckIfCarExistsByLicensePlateRepositorySpy,
  CheckIfCarBrandExistsByIdRepositorySpy,
  CheckIfCarCategoryExistsByIdRepositorySpy,
  FindAllSpecificationsByIdsRepositorySpy,
  CreateCarRepositorySpy,
  makeCreateCarUseCaseInputMock,
} from '../../mocks';

let checkIfCarExistsByLicensePlateRepositorySpy: CheckIfCarExistsByLicensePlateRepositorySpy;
let checkIfCarBrandExistsByIdRepositorySpy: CheckIfCarBrandExistsByIdRepositorySpy;
let checkIfCarCategoryExistsByIdRepositorySpy: CheckIfCarCategoryExistsByIdRepositorySpy;
let findAllSpecificationsByIdsRepositorySpy: FindAllSpecificationsByIdsRepositorySpy;
let createCarRepositorySpy: CreateCarRepositorySpy;

let createCarUseCase: CreateCarUseCase;

describe('CreateCarUseCase', () => {
  beforeEach(() => {
    checkIfCarExistsByLicensePlateRepositorySpy =
      new CheckIfCarExistsByLicensePlateRepositorySpy();
    checkIfCarBrandExistsByIdRepositorySpy =
      new CheckIfCarBrandExistsByIdRepositorySpy();
    checkIfCarCategoryExistsByIdRepositorySpy =
      new CheckIfCarCategoryExistsByIdRepositorySpy();
    findAllSpecificationsByIdsRepositorySpy =
      new FindAllSpecificationsByIdsRepositorySpy();
    createCarRepositorySpy = new CreateCarRepositorySpy();

    createCarUseCase = new CreateCarUseCase(
      checkIfCarExistsByLicensePlateRepositorySpy,
      checkIfCarBrandExistsByIdRepositorySpy,
      checkIfCarCategoryExistsByIdRepositorySpy,
      findAllSpecificationsByIdsRepositorySpy,
      createCarRepositorySpy
    );
  });

  it('should call CheckIfCarExistsByLicensePlateRepository once with correct values', async () => {
    const checkIfExistsByLicensePlateSpy = jest.spyOn(
      checkIfCarExistsByLicensePlateRepositorySpy,
      'checkIfExistsByLicensePlate'
    );

    const input = makeCreateCarUseCaseInputMock();

    await createCarUseCase.execute(input);

    expect(checkIfExistsByLicensePlateSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByLicensePlateSpy).toHaveBeenCalledWith({
      license_plate: input.license_plate,
    });
  });

  it('should throw if CheckIfCarExistsByLicensePlateRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfCarExistsByLicensePlateRepositorySpy,
        'checkIfExistsByLicensePlate'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarAlreadyExistsWithProvidedLicensePlateError if CheckIfCarExistsByLicensePlateRepository returns true', async () => {
    jest
      .spyOn(
        checkIfCarExistsByLicensePlateRepositorySpy,
        'checkIfExistsByLicensePlate'
      )
      .mockResolvedValueOnce(true);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarAlreadyExistsWithProvidedLicensePlateError
    );
  });

  it('should call CheckIfCarBrandExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarBrandExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeCreateCarUseCaseInputMock();

    await createCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: input.brand_id });
  });

  it('should throw if CheckIfCarBrandExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarBrandExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarBrandNotFoundWithProvidedIdError if CheckIfCarBrandExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfCarCategoryExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarCategoryExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeCreateCarUseCaseInputMock();

    await createCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.category_id,
    });
  });

  it('should throw if CheckIfCarCategoryExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarCategoryExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarCategoryNotFoundWithProvidedIdError if CheckIfCarCategoryExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryNotFoundWithProvidedIdError
    );
  });

  it('should call FindAllSpecificationsByIdsRepository once with correct values only if input has specification ids', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    const input = makeCreateCarUseCaseInputMock();

    await createCarUseCase.execute(input);

    expect(findAllByIdsSpy).toHaveBeenCalledTimes(1);
    expect(findAllByIdsSpy).toHaveBeenCalledWith({
      ids: input.specifications_ids,
    });
  });

  it('should call FindAllSpecificationsByIdsRepository only if provided specifications ids length are more than zero', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    const input = makeCreateCarUseCaseInputMock();

    input.specifications_ids = [];

    await createCarUseCase.execute(input);

    expect(findAllByIdsSpy).not.toHaveBeenCalled();
  });

  it('should not call FindAllSpecificationsByIdsRepository if input has not specification ids', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    const input = makeCreateCarUseCaseInputMock();

    input.specifications_ids = undefined;

    await createCarUseCase.execute(input);

    expect(findAllByIdsSpy).not.toHaveBeenCalled();
  });

  it('should call FindAllSpecificationsByIdsRepository without duplicated specifications ids', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    const input = makeCreateCarUseCaseInputMock();

    const specificationIds = [faker.datatype.uuid(), faker.datatype.uuid()];

    input.specifications_ids = [
      ...specificationIds,
      ...specificationIds,
      ...specificationIds,
    ];

    await createCarUseCase.execute(input);

    expect(findAllByIdsSpy).toHaveBeenCalledWith({ ids: specificationIds });
  });

  it('should throw if FindAllSpecificationsByIdsRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllSpecificationsByIdsRepositorySpy, 'findAllByIds')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError if specifications found count are different from provided specifications ids count', async () => {
    jest
      .spyOn(findAllSpecificationsByIdsRepositorySpy, 'findAllByIds')
      .mockResolvedValueOnce([makeCarSpecificationMock()]);

    const specificationIds = [faker.datatype.uuid(), faker.datatype.uuid()];

    const input = makeCreateCarUseCaseInputMock();

    input.specifications_ids = [...specificationIds, ...specificationIds];

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError
    );
  });

  it('should call CreateCarRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createCarRepositorySpy, 'create');

    const input = makeCreateCarUseCaseInputMock();

    await createCarUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: input.name,
      description: input.description,
      license_plate: input.license_plate,
      daily_rate: input.daily_rate,
      daily_late_fee: input.daily_late_fee,
      brand_id: input.brand_id,
      category_id: input.category_id,
      horse_power: input.horse_power,
      max_speed: input.max_speed,
      number_of_seats: input.number_of_seats,
      zero_to_one_hundred_in_millisseconds:
        input.zero_to_one_hundred_in_millisseconds,
      transmission_type: input.transmission_type,
      type_of_fuel: input.type_of_fuel,
      specifications_ids: input.specifications_ids,
    });
  });

  it('should throw if CreateCarRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateCarUseCaseInputMock();

    const promise = createCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return a new Car on success', async () => {
    const carMock = makeCarMock();

    jest.spyOn(createCarRepositorySpy, 'create').mockResolvedValueOnce(carMock);

    const input = makeCreateCarUseCaseInputMock();

    const output = await createCarUseCase.execute(input);

    expect(output).toEqual(carMock);
  });
});
