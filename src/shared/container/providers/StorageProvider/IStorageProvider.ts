export type SaveDTO = {
  file_name: string;
  folder_name: string;
};

export type DeleteDTO = {
  file_name: string;
  folder_name: string;
};

export interface IStorageProvider {
  save(data: SaveDTO): Promise<string>;
  delete(data: DeleteDTO): Promise<void>;
}
