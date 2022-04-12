import { IStoreFileProvider } from '@application/protocols/providers/storage';

export class StoreFileProviderSpy implements IStoreFileProvider {
  async store(_: IStoreFileProvider.Input): Promise<IStoreFileProvider.Output> {
    // That's all folks 🐰
  }
}
