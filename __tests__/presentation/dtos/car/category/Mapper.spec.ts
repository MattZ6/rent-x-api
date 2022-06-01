import { CarCategoryMapper } from '@presentation/dtos';

import { makeCarCategoryMock } from '../../../../domain';

describe('CarCategoryMapper', () => {
  it('should return category DTO', () => {
    const carCategoryMock = makeCarCategoryMock();

    const output = CarCategoryMapper.toCategoryDTO(carCategoryMock);

    expect(output).toEqual({
      id: carCategoryMock.id,
      name: carCategoryMock.name,
      description: carCategoryMock.description,
    });
  });

  it('should return null if no data is provided', () => {
    const output = CarCategoryMapper.toCategoryDTO(undefined);

    expect(output).toBeNull();
  });

  it('should return a list of category DTO', () => {
    const carCategoriesMock = [
      makeCarCategoryMock(),
      makeCarCategoryMock(),
      makeCarCategoryMock(),
      makeCarCategoryMock(),
    ];

    const output = CarCategoryMapper.toCategoriesDTO(carCategoriesMock);

    expect(output).toEqual(
      carCategoriesMock.map(({ id, name, description }) => ({
        id,
        name,
        description,
      }))
    );
  });
});
