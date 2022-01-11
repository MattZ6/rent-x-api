interface ICheckIfCarExistsByLicensePlateRepository {
  checkIfExistsByLicensePlate(
    data: ICheckIfCarExistsByLicensePlateRepository.Input
  ): Promise<ICheckIfCarExistsByLicensePlateRepository.Output>;
}

namespace ICheckIfCarExistsByLicensePlateRepository {
  export type Input = {
    license_plate: string;
  };

  export type Output = boolean;
}

export { ICheckIfCarExistsByLicensePlateRepository };
