interface ICarLicensePlateValidator {
  isValid(
    data: ICarLicensePlateValidator.Input
  ): ICarLicensePlateValidator.Output;
}

namespace ICarLicensePlateValidator {
  export type Input = {
    license_plate: string;
  };

  export type Output = boolean;
}

export { ICarLicensePlateValidator };
