export interface IDateProvider {
  getDiffInHours(startDate: Date, endDate: Date): number;
  converToUTC(date: Date): string;
}
