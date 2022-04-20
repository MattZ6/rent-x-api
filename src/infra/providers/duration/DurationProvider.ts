import { IGetDurationInDaysProvider } from '@application/protocols/providers/duration/GetInDays';

export class DurationProvider implements IGetDurationInDaysProvider {
  getDurationInDays(
    data: IGetDurationInDaysProvider.Input
  ): IGetDurationInDaysProvider.Output {
    const ONE_DAY_IN_MILLISSECONDS = 1 * 24 * 60 * 60 * 1000;

    const { start_date, end_date } = data;

    const durationInMillisseconds = end_date.getTime() - start_date.getTime();

    return Math.ceil(durationInMillisseconds / ONE_DAY_IN_MILLISSECONDS);
  }
}
