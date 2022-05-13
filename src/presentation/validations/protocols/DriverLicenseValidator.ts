interface IDriverLicenseValidator {
  isValid(data: IDriverLicenseValidator.Input): IDriverLicenseValidator.Output;
}

namespace IDriverLicenseValidator {
  export type Input = {
    driver_license: string;
  };

  export type Output = boolean;
}

export { IDriverLicenseValidator };
