import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  getDiffInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.converToUTC(startDate);
    const endDateUTC = this.converToUTC(endDate);

    return dayjs(endDateUTC).diff(startDateUTC, 'hours');
  }

  converToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}
