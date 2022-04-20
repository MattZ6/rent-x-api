import { IGetDurationInDaysProvider } from '@application/protocols/providers/duration/GetInDays';

export class GetDurationInDaysProviderSpy
  implements IGetDurationInDaysProvider
{
  getDurationInDays(
    _: IGetDurationInDaysProvider.Input
  ): IGetDurationInDaysProvider.Output {
    return 1;
  }
}
