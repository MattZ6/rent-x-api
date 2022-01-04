import { EtherealMailProvider } from '@infra/providers/email/EtherealMailProvider';

let etherealMailProvider: EtherealMailProvider;

export function makeEtherealMailProvider() {
  if (!etherealMailProvider) {
    etherealMailProvider = new EtherealMailProvider();
  }

  return etherealMailProvider;
}
