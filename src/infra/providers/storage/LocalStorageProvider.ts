import { access, mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

import { IStoreFileProvider } from '@application/protocols/providers/storage';

export class DiskStorageProvider implements IStoreFileProvider {
  constructor(private readonly rootFolder: string) {}

  private async checkIfFolderExists(path: string) {
    try {
      await access(resolve(path));

      return true;
    } catch (error) {
      return false;
    }
  }

  private async createFolder(path: string) {
    await mkdir(resolve(path), { recursive: true });
  }

  private async saveFile(path: string, data: Buffer) {
    return writeFile(resolve(path), data);
  }

  async store(
    data: IStoreFileProvider.Input
  ): Promise<IStoreFileProvider.Output> {
    const { folder_path, file_name, content } = data;

    const path = `${this.rootFolder}/${folder_path}`;

    const exists = await this.checkIfFolderExists(path);

    if (!exists) {
      await this.createFolder(path);
    }

    await this.saveFile(`${path}/${file_name}`, content);
  }
}
