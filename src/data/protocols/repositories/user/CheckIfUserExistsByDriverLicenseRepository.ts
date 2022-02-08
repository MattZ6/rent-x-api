interface ICheckIfUserExistsByDriverLicenseRepository {
  checkIfExistsByDriverLicense(
    data: ICheckIfUserExistsByDriverLicenseRepository.Input
  ): Promise<ICheckIfUserExistsByDriverLicenseRepository.Output>;
}

namespace ICheckIfUserExistsByDriverLicenseRepository {
  export type Input = {
    driver_license: string;
  };

  export type Output = boolean;
}

export { ICheckIfUserExistsByDriverLicenseRepository };
