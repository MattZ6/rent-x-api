export interface ICheckIfCarExistsByLicensePlateRepository {
  checkIfExistsByLicensePlate(license_plate: string): Promise<boolean>;
}
