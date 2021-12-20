export interface IGenerateUuidProvider {
  generate(): Promise<string>;
}
