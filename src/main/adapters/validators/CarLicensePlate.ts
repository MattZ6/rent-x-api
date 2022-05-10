import { ICarLicensePlateValidator } from '@presentation/validations/protocols';

export class CarLicensePlateValidatorAdapter
  implements ICarLicensePlateValidator
{
  private readonly carLicensePlateRegex = /[a-zA-Z]{3}[0-9][0-9a-zA-Z][0-9]{2}/;

  isValid(
    data: ICarLicensePlateValidator.Input
  ): ICarLicensePlateValidator.Output {
    const { license_plate } = data;

    return this.carLicensePlateRegex.test(license_plate);
  }
}
