import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  getDiffInDays(startDate: Date, endDate: Date): number {
    const startDateUTC = this.converToUTC(startDate);
    const endDateUTC = this.converToUTC(endDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'days');
  }

  getDiffInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.converToUTC(startDate);
    const endDateUTC = this.converToUTC(endDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  converToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addDays(date: Date, daysToAdd: number): Date {
    return dayjs(date).add(daysToAdd, 'days').toDate();
  }

  addHours(date: Date, hoursToAdd: number): Date {
    return dayjs(date).add(hoursToAdd, 'hours').toDate();
  }

  isBefore(date: Date, dateToCompare: Date): boolean {
    return dayjs(date).isBefore(dateToCompare);
  }
}
