import { ListAllCarBrandsUseCase } from '@application/usecases/car/brand/ListAllCarBrands';

import { carBrandMock } from '../../../../domain/models';
import {
  FindAllCarBrandsRepositorySpy,
  listAllCarBrandsUseCaseInputMock,
} from '../../../mocks';

let findAllCarBrandsRepositorySpy: FindAllCarBrandsRepositorySpy;

let listAllCarBrandsUseCase: ListAllCarBrandsUseCase;

describe('ListAllCarBrandsUseCase', () => {
  beforeEach(() => {
    findAllCarBrandsRepositorySpy = new FindAllCarBrandsRepositorySpy();

    listAllCarBrandsUseCase = new ListAllCarBrandsUseCase(
      findAllCarBrandsRepositorySpy
    );
  });

  it('should call FindAllCarBrandsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarBrandsRepositorySpy, 'findAll');

    await listAllCarBrandsUseCase.execute(listAllCarBrandsUseCaseInputMock);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarBrandsUseCaseInputMock.order_by,
      order: listAllCarBrandsUseCaseInputMock.order,
      take: listAllCarBrandsUseCaseInputMock.limit,
      skip:
        (listAllCarBrandsUseCaseInputMock.page - 1) *
        listAllCarBrandsUseCaseInputMock.limit,
    });
  });

  it('should throw if FindAllCarBrandsRepository throws', async () => {
    jest
      .spyOn(findAllCarBrandsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarBrandsUseCase.execute(
      listAllCarBrandsUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return car brands', async () => {
    const brandsMock = [carBrandMock, carBrandMock];

    jest
      .spyOn(findAllCarBrandsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(brandsMock);

    const brands = await listAllCarBrandsUseCase.execute(
      listAllCarBrandsUseCaseInputMock
    );

    expect(brands).toEqual(brandsMock);
  });
});
