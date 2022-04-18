interface IGenerateUuidProvider {
  generate(): Promise<IGenerateUuidProvider.Output>;
}

namespace IGenerateUuidProvider {
  export type Output = string;
}

export { IGenerateUuidProvider };
