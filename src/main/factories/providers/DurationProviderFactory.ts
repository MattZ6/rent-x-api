import { DurationProvider } from '@infra/providers/duration/DurationProvider';

export function makeDurationProvider() {
  return new DurationProvider();
}
