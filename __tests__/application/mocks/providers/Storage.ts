import {
  IDeleteFileProvider,
  IStoreFileProvider,
} from '@application/protocols/providers/storage';

export class StoreFileProviderSpy implements IStoreFileProvider {
  async store(_: IStoreFileProvider.Input): Promise<IStoreFileProvider.Output> {
    // That's all folks 🐰
  }
}

export class DeleteFileProviderSpy implements IDeleteFileProvider {
  async delete(
    _: IDeleteFileProvider.Input
  ): Promise<IDeleteFileProvider.Output> {
    // That's all folks 🥕
  }
}
