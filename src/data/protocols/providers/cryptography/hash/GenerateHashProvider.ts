export interface IGenerateHashProvider {
  hash(value: string): Promise<string>;
}
