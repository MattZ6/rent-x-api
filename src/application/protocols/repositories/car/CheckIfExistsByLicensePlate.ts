import { Car } from '@domain/entities/Car';

interface ICheckIfCarExistsByLicensePlateRepository {
  checkIfExistsByLicensePlate(
    data: ICheckIfCarExistsByLicensePlateRepository.Input
  ): Promise<ICheckIfCarExistsByLicensePlateRepository.Output>;
}

namespace ICheckIfCarExistsByLicensePlateRepository {
  export type Input = Pick<Car, 'license_plate'>;

  export type Output = boolean;
}

export { ICheckIfCarExistsByLicensePlateRepository };
