import faker from 'faker';

import {
  CarAlreadyExistsWithThisLicensePlateError,
  CarBrandNotFoundWithThisIdError,
  CarCategoryNotFoundWithThisIdError,
  OneOrMoreCarSpecificationsNotFoundWithThisIdsError,
} from '@domain/errors';
import { TransmissionTypeEnum, TypeOfFuelEnum } from '@domain/models/Car';
import { ICreateCarUseCase } from '@domain/usecases/car/CreateCar';

import { CreateCarUseCase } from '@data/usecases/car/CreateCar';

import { carSpecificationMock } from '../../../domain/models/car-specification.mock';
import {
  CheckIfCarBrandExistsByIdRepositorySpy,
  CheckIfCarCategoryExistsByIdRepositorySpy,
  CheckIfCarExistsByLicensePlateRepositorySpy,
  CreateCarRepositorySpy,
  FindAllSpecificationsByIdsRepositorySpy,
} from '../../mocks';

let checkIfCarExistsByLicensePlateRepositorySpy: CheckIfCarExistsByLicensePlateRepositorySpy;
let checkIfCarBrandExistsByIdRepositorySpy: CheckIfCarBrandExistsByIdRepositorySpy;
let checkIfCarCategoryExistsByIdRepositorySpy: CheckIfCarCategoryExistsByIdRepositorySpy;
let findAllSpecificationsByIdsRepositorySpy: FindAllSpecificationsByIdsRepositorySpy;
let createCarRepositorySpy: CreateCarRepositorySpy;

let createCarUseCase: CreateCarUseCase;

const createCarUseCaseInputMock: ICreateCarUseCase.Input = {
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  daily_rate: faker.datatype.number(),
  daily_late_fee: faker.datatype.number(),
  license_plate: faker.datatype.string(),
  brand_id: faker.datatype.uuid(),
  category_id: faker.datatype.uuid(),
  specifications_ids: [faker.datatype.uuid(), faker.datatype.uuid()],
  horse_power: faker.datatype.number({ max: 10_000, min: 100 }),
  max_speed: faker.datatype.number({ min: 100, max: 360 }),
  number_of_seats: faker.datatype.number({ min: 1, max: 7 }),
  zero_to_one_hundred_in_millisseconds: faker.datatype.float({
    min: 2,
    max: 15,
  }),
  transmission_type: faker.random.arrayElement([
    TransmissionTypeEnum.MANUAL,
    TransmissionTypeEnum.AUTO,
  ]),
  type_of_fuel: faker.random.arrayElement([
    TypeOfFuelEnum.ALCOHOL,
    TypeOfFuelEnum.ELETRICITY,
    TypeOfFuelEnum.GAS,
  ]),
};

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

    const licensePlate = faker.datatype.string();

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      license_plate: licensePlate,
    });

    expect(checkIfExistsByLicensePlateSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByLicensePlateSpy).toHaveBeenCalledWith({
      license_plate: licensePlate,
    });
  });

  it('should throw if CheckIfCarExistsByLicensePlateRepository throws', async () => {
    jest
      .spyOn(
        checkIfCarExistsByLicensePlateRepositorySpy,
        'checkIfExistsByLicensePlate'
      )
      .mockRejectedValueOnce(new Error());

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarAlreadyExistsWithThisLicensePlateError if already exists a car with same license plate', async () => {
    jest
      .spyOn(
        checkIfCarExistsByLicensePlateRepositorySpy,
        'checkIfExistsByLicensePlate'
      )
      .mockResolvedValueOnce(true);

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      CarAlreadyExistsWithThisLicensePlateError
    );
  });

  it('should call CheckIfCarBrandExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarBrandExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const brandId = faker.datatype.uuid();

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      brand_id: brandId,
    });

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: brandId });
  });

  it('should throw if CheckIfCarBrandExistsByIdRepository throws', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(new Error());

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarBrandNotFoundWithThisIdError if car brand does not exists', async () => {
    jest
      .spyOn(checkIfCarBrandExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      CarBrandNotFoundWithThisIdError
    );
  });

  it('should call CheckIfCarCategoryExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarCategoryExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const categoryId = faker.datatype.uuid();

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      category_id: categoryId,
    });

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({ id: categoryId });
  });

  it('should throw if CheckIfCarCategoryExistsByIdRepository throws', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(new Error());

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarCategoryNotFoundWithThisIdError if car brand does not exists', async () => {
    jest
      .spyOn(checkIfCarCategoryExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      CarCategoryNotFoundWithThisIdError
    );
  });

  it('should call FindAllSpecificationsByIdsRepository once with correct values', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    const specificationsIds = [faker.datatype.uuid(), faker.datatype.uuid()];

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: specificationsIds,
    });

    expect(findAllByIdsSpy).toHaveBeenCalledTimes(1);
    expect(findAllByIdsSpy).toHaveBeenCalledWith({ ids: specificationsIds });
  });

  it('should throw if FindAllSpecificationsByIdsRepository throws', async () => {
    jest
      .spyOn(findAllSpecificationsByIdsRepositorySpy, 'findAllByIds')
      .mockRejectedValueOnce(new Error());

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should call FindAllSpecificationsByIdsRepository only if specifications ids were provided', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: undefined,
    });

    expect(findAllByIdsSpy).not.toHaveBeenCalled();
  });

  it('should call FindAllSpecificationsByIdsRepository only if provided specifications ids length are more than zero', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: [],
    });

    expect(findAllByIdsSpy).not.toHaveBeenCalled();
  });

  it('should call FindAllSpecificationsByIdsRepository without duplicated specifications ids', async () => {
    const findAllByIdsSpy = jest.spyOn(
      findAllSpecificationsByIdsRepositorySpy,
      'findAllByIds'
    );

    const specificationIds = [faker.datatype.uuid(), faker.datatype.uuid()];

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: [
        ...specificationIds,
        ...specificationIds,
        ...specificationIds,
      ],
    });

    expect(findAllByIdsSpy).toHaveBeenCalledWith({ ids: specificationIds });
  });

  it('should throw OneOrMoreCarSpecificationsNotFoundWithThisIdsError if specifications found count are different from provided specifications ids count', async () => {
    jest
      .spyOn(findAllSpecificationsByIdsRepositorySpy, 'findAllByIds')
      .mockResolvedValueOnce([carSpecificationMock]);

    const specificationIds = [faker.datatype.uuid(), faker.datatype.uuid()];

    const promise = createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: [...specificationIds, ...specificationIds],
    });

    await expect(promise).rejects.toBeInstanceOf(
      OneOrMoreCarSpecificationsNotFoundWithThisIdsError
    );
  });

  it('should call CreateCarRepository once with correct values', async () => {
    const specifications = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(findAllSpecificationsByIdsRepositorySpy, 'findAllByIds')
      .mockResolvedValueOnce(specifications);

    const createSpy = jest.spyOn(createCarRepositorySpy, 'create');

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: [faker.datatype.uuid(), faker.datatype.uuid()],
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: createCarUseCaseInputMock.name,
      description: createCarUseCaseInputMock.description,
      license_plate: createCarUseCaseInputMock.license_plate,
      daily_rate: createCarUseCaseInputMock.daily_rate,
      daily_late_fee: createCarUseCaseInputMock.daily_late_fee,
      brand_id: createCarUseCaseInputMock.brand_id,
      category_id: createCarUseCaseInputMock.category_id,
      horse_power: createCarUseCaseInputMock.horse_power,
      max_speed: createCarUseCaseInputMock.max_speed,
      number_of_seats: createCarUseCaseInputMock.number_of_seats,
      zero_to_one_hundred_in_millisseconds:
        createCarUseCaseInputMock.zero_to_one_hundred_in_millisseconds,
      transmission_type: createCarUseCaseInputMock.transmission_type,
      type_of_fuel: createCarUseCaseInputMock.type_of_fuel,
      specifications,
    });
  });

  it('should call CreateCarRepository without specifications if specifications ids were not provided', async () => {
    const createSpy = jest.spyOn(createCarRepositorySpy, 'create');

    await createCarUseCase.execute({
      ...createCarUseCaseInputMock,
      specifications_ids: undefined,
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: createCarUseCaseInputMock.name,
      description: createCarUseCaseInputMock.description,
      license_plate: createCarUseCaseInputMock.license_plate,
      daily_rate: createCarUseCaseInputMock.daily_rate,
      daily_late_fee: createCarUseCaseInputMock.daily_late_fee,
      brand_id: createCarUseCaseInputMock.brand_id,
      category_id: createCarUseCaseInputMock.category_id,
      horse_power: createCarUseCaseInputMock.horse_power,
      max_speed: createCarUseCaseInputMock.max_speed,
      number_of_seats: createCarUseCaseInputMock.number_of_seats,
      zero_to_one_hundred_in_millisseconds:
        createCarUseCaseInputMock.zero_to_one_hundred_in_millisseconds,
      transmission_type: createCarUseCaseInputMock.transmission_type,
      type_of_fuel: createCarUseCaseInputMock.type_of_fuel,
      specifications: [],
    });
  });

  it('should throw if CheckIfCarExistsByLicensePlateRepository throws', async () => {
    jest
      .spyOn(createCarRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createCarUseCase.execute(createCarUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should return a new car on success', async () => {
    const response = await createCarUseCase.execute(createCarUseCaseInputMock);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name', createCarUseCaseInputMock.name);
    expect(response).toHaveProperty(
      'description',
      createCarUseCaseInputMock.description
    );
    expect(response).toHaveProperty(
      'daily_late_fee',
      createCarUseCaseInputMock.daily_late_fee
    );
    expect(response).toHaveProperty(
      'daily_rate',
      createCarUseCaseInputMock.daily_rate
    );
    expect(response).toHaveProperty(
      'license_plate',
      createCarUseCaseInputMock.license_plate
    );
    expect(response).toHaveProperty(
      'brand_id',
      createCarUseCaseInputMock.brand_id
    );
    expect(response).toHaveProperty(
      'category_id',
      createCarUseCaseInputMock.category_id
    );
    expect(response).toHaveProperty(
      'horse_power',
      createCarUseCaseInputMock.horse_power
    );
    expect(response).toHaveProperty(
      'max_speed',
      createCarUseCaseInputMock.max_speed
    );
    expect(response).toHaveProperty(
      'number_of_seats',
      createCarUseCaseInputMock.number_of_seats
    );
    expect(response).toHaveProperty(
      'zero_to_one_hundred_in_millisseconds',
      createCarUseCaseInputMock.zero_to_one_hundred_in_millisseconds
    );
    expect(response).toHaveProperty(
      'transmission_type',
      createCarUseCaseInputMock.transmission_type
    );
    expect(response).toHaveProperty(
      'type_of_fuel',
      createCarUseCaseInputMock.type_of_fuel
    );
    expect(response).toHaveProperty('specifications');
    expect(response).toHaveProperty('created_at');
    expect(response).toHaveProperty('updated_at');
  });
});
