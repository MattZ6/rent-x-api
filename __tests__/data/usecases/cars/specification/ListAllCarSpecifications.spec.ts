import faker from 'faker';

import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAllCarSpecifications';

import { ListAllCarSpecificationsUseCase } from '@data/usecases/car/specification/ListAllCarSpecifications';

import { carSpecificationMock } from '../../../../domain/models/car-specification.mock';
import { FindAllCarSpecificationsRepositorySpy } from '../../../mocks';

let findAllCarSpecificationsRepositorySpy: FindAllCarSpecificationsRepositorySpy;

let listAllCarSpecificationsUseCase: ListAllCarSpecificationsUseCase;

const listAllCarSpecificationsUseCaseInput: IListAllCarSpecificationsUseCase.Input =
  {
    order_by: 'created_at',
    order: 'DESC',
    limit: faker.datatype.number({ min: 1, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 30 }),
  };

describe('ListAllCarSpecificationsUseCase', () => {
  beforeEach(() => {
    findAllCarSpecificationsRepositorySpy =
      new FindAllCarSpecificationsRepositorySpy();

    listAllCarSpecificationsUseCase = new ListAllCarSpecificationsUseCase(
      findAllCarSpecificationsRepositorySpy
    );
  });

  it('should call FindAllCarSpecificationsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(
      findAllCarSpecificationsRepositorySpy,
      'findAll'
    );

    await listAllCarSpecificationsUseCase.execute(
      listAllCarSpecificationsUseCaseInput
    );

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarSpecificationsUseCaseInput.order_by,
      order: listAllCarSpecificationsUseCaseInput.order,
      take: listAllCarSpecificationsUseCaseInput.limit,
      skip:
        listAllCarSpecificationsUseCaseInput.page *
        listAllCarSpecificationsUseCaseInput.limit,
    });
  });

  it('should throw if FindAllCarSpecificationsRepository throws', async () => {
    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarSpecificationsUseCase.execute(
      listAllCarSpecificationsUseCaseInput
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return car specifications', async () => {
    const specificationsMock = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(specificationsMock);

    const specifications = await listAllCarSpecificationsUseCase.execute(
      listAllCarSpecificationsUseCaseInput
    );

    expect(specifications).toEqual(specificationsMock);
  });
});
