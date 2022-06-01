import { CarBrandMapper } from '@presentation/dtos';

import { makeCarBrandMock } from '../../../../domain';

describe('CarBrandMapper', () => {
  it('should return brand DTO', () => {
    const carBrandMock = makeCarBrandMock();

    const output = CarBrandMapper.toBrandDTO(carBrandMock);

    expect(output).toEqual({
      id: carBrandMock.id,
      name: carBrandMock.name,
    });
  });

  it('should return null if no data is provided', () => {
    const output = CarBrandMapper.toBrandDTO(undefined);

    expect(output).toBeNull();
  });

  it('should return a list of brand DTO', () => {
    const carBrandsMock = [
      makeCarBrandMock(),
      makeCarBrandMock(),
      makeCarBrandMock(),
      makeCarBrandMock(),
    ];

    const output = CarBrandMapper.toBrandsDTO(carBrandsMock);

    expect(output).toEqual(carBrandsMock.map(({ id, name }) => ({ id, name })));
  });
});
