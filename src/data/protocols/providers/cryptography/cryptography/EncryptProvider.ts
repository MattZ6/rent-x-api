export type EncryptPayload = {
  value: string;
};

export interface IEncryptProvider {
  encrypt(data: EncryptPayload): Promise<string>;
}
