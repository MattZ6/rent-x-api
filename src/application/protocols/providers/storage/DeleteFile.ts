interface IDeleteFileProvider {
  delete(data: IDeleteFileProvider.Input): Promise<IDeleteFileProvider.Output>;
}

namespace IDeleteFileProvider {
  export type Input = {
    file_name: string;
    folder_path: string;
  };

  export type Output = void;
}

export { IDeleteFileProvider };
