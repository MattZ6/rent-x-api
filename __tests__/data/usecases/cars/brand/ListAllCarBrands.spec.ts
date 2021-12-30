import faker from 'faker';

import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAllCarBrands';

import { ListAllCarBrandsUseCase } from '@data/usecases/car/brand/ListAllCarBrands';

import { carBrandMock } from '../../../../domain/models/car-brand.mock';
import { FindAllCarBrandsRepositorySpy } from '../../../mocks';

let findAllCarBrandsRepositorySpy: FindAllCarBrandsRepositorySpy;

let listAllCarBrandsUseCase: ListAllCarBrandsUseCase;

const listAllCarBrandsUseCaseInput: IListAllCarBrandsUseCase.Input = {
  order_by: faker.random.arrayElement(['name', 'created_at']),
  order: faker.random.arrayElement(['ASC', 'DESC']),
  limit: faker.datatype.number({ min: 1, max: 100 }),
  page: faker.datatype.number({ min: 1, max: 30 }),
};

describe('ListAllCarBrandsUseCase', () => {
  beforeEach(() => {
    findAllCarBrandsRepositorySpy = new FindAllCarBrandsRepositorySpy();

    listAllCarBrandsUseCase = new ListAllCarBrandsUseCase(
      findAllCarBrandsRepositorySpy
    );
  });

  it('should call FindAllCarBrandsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarBrandsRepositorySpy, 'findAll');

    await listAllCarBrandsUseCase.execute(listAllCarBrandsUseCaseInput);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarBrandsUseCaseInput.order_by,
      order: listAllCarBrandsUseCaseInput.order,
      take: listAllCarBrandsUseCaseInput.limit,
      skip:
        (listAllCarBrandsUseCaseInput.page - 1) *
        listAllCarBrandsUseCaseInput.limit,
    });
  });

  it('should throw if FindAllCarBrandsRepository throws', async () => {
    jest
      .spyOn(findAllCarBrandsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarBrandsUseCase.execute(
      listAllCarBrandsUseCaseInput
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return car brands', async () => {
    const brandsMock = [carBrandMock, carBrandMock];

    jest
      .spyOn(findAllCarBrandsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(brandsMock);

    const brands = await listAllCarBrandsUseCase.execute(
      listAllCarBrandsUseCaseInput
    );

    expect(brands).toEqual(brandsMock);
  });
});
