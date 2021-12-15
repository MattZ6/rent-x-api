export interface IDateProvider {
  getDiffInHours(startDate: Date, endDate: Date): number;
  converToUTC(date: Date): string;
  getDiffInDays(startDate: Date, endDate: Date): number;
  addDays(date: Date, daysToAdd: number): Date;
  addHours(date: Date, hoursToAdd: number): Date;
  isBefore(date: Date, dateToCompare: Date): boolean;
}
