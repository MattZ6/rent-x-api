interface IGetDurationInDaysProvider {
  getDurationInDays(
    data: IGetDurationInDaysProvider.Input
  ): IGetDurationInDaysProvider.Output;
}

namespace IGetDurationInDaysProvider {
  export type Input = {
    start_date: Date;
    end_date: Date;
  };

  export type Output = number;
}

export { IGetDurationInDaysProvider };
