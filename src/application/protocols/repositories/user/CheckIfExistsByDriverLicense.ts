import { User } from '@domain/entities/User';

interface ICheckIfUserExistsByDriverLicenseRepository {
  checkIfExistsByDriverLicense(
    data: ICheckIfUserExistsByDriverLicenseRepository.Input
  ): Promise<ICheckIfUserExistsByDriverLicenseRepository.Output>;
}

namespace ICheckIfUserExistsByDriverLicenseRepository {
  export type Input = Pick<User, 'driver_license'>;

  export type Output = boolean;
}

export { ICheckIfUserExistsByDriverLicenseRepository };
