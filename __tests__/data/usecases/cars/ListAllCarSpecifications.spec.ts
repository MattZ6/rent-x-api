import faker from 'faker';

import { ListAllCarSpecificationsUseCase } from '@data/usecases/car/ListAllCarSpecifications';

import { carSpecificationMock } from '../../../domain/models/car-specification.mock';
import { FindAllCarSpecificationsRepositorySpy } from '../../mocks';

const defaultLimit = faker.datatype.number({ min: 1, max: 100 });
const defaultPage = faker.datatype.number({ min: 1, max: 50 });
let findAllCarSpecificationsRepositorySpy: FindAllCarSpecificationsRepositorySpy;

let listAllCarSpecificationsUseCase: ListAllCarSpecificationsUseCase;

describe('ListAllCarSpecificationsUseCase', () => {
  beforeEach(() => {
    findAllCarSpecificationsRepositorySpy =
      new FindAllCarSpecificationsRepositorySpy();

    listAllCarSpecificationsUseCase = new ListAllCarSpecificationsUseCase(
      defaultLimit,
      defaultPage,
      findAllCarSpecificationsRepositorySpy
    );
  });

  it('should call FindAllCarSpecificationsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(
      findAllCarSpecificationsRepositorySpy,
      'findAll'
    );

    const limit = faker.datatype.number({ min: 1, max: 100 });
    const page = faker.datatype.number({ min: 1, max: 30 });

    await listAllCarSpecificationsUseCase.execute({
      limit,
      page,
    });

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      take: limit,
      skip: page * limit,
    });
  });

  it('should throw if FindAllCarSpecificationsRepository throws', async () => {
    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarSpecificationsUseCase.execute({
      limit: faker.datatype.number({ min: 1, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 30 }),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call FindAllCarSpecificationsRepository with default limit and page values if not provided', async () => {
    const findAllSpy = jest.spyOn(
      findAllCarSpecificationsRepositorySpy,
      'findAll'
    );

    await listAllCarSpecificationsUseCase.execute();

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      take: defaultLimit,
      skip: defaultPage * defaultLimit,
    });
  });

  it('should return car specifications', async () => {
    const specificationsMock = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(specificationsMock);

    const specifications = await listAllCarSpecificationsUseCase.execute({
      limit: faker.datatype.number({ min: 1, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 30 }),
    });

    expect(specifications).toEqual(specificationsMock);
  });
});
