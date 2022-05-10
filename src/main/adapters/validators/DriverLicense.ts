import { IDriverLicenseValidator } from '@presentation/validations/protocols';

export class DriverLicenseValidatorAdapter implements IDriverLicenseValidator {
  isValid(data: IDriverLicenseValidator.Input): IDriverLicenseValidator.Output {
    const { driver_license } = data;

    return driver_license.replace(/[^\d]/g, '').length === 11;
  }
}
