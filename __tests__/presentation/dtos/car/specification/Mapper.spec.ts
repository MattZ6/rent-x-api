import { CarSpecificationMapper } from '@presentation/dtos';

import { makeCarSpecificationMock } from '../../../../domain';

describe('CarSpecificationMapper', () => {
  it('should return specification DTO', () => {
    const carSpecificationMock = makeCarSpecificationMock();

    const output =
      CarSpecificationMapper.toSpecificationDTO(carSpecificationMock);

    expect(output).toEqual({
      id: carSpecificationMock.id,
      name: carSpecificationMock.name,
      description: carSpecificationMock.description,
    });
  });

  it('should return null if no data is provided', () => {
    const output = CarSpecificationMapper.toSpecificationDTO(undefined);

    expect(output).toBeNull();
  });

  it('should return a list of specification DTO', () => {
    const carSpecificationsMock = [
      makeCarSpecificationMock(),
      makeCarSpecificationMock(),
      makeCarSpecificationMock(),
      makeCarSpecificationMock(),
    ];

    const output = CarSpecificationMapper.toSpecificationsDTO(
      carSpecificationsMock
    );

    expect(output).toEqual(
      carSpecificationsMock.map(({ id, name, description }) => ({
        id,
        name,
        description,
      }))
    );
  });
});
