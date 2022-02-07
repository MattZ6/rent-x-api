interface IStoreFileProvider {
  store(data: IStoreFileProvider.Input): Promise<IStoreFileProvider.Output>;
}

namespace IStoreFileProvider {
  export type Input = {
    file_name: string;
    folder_path: string;
    content: Buffer;
  };

  export type Output = void;
}

export { IStoreFileProvider };
