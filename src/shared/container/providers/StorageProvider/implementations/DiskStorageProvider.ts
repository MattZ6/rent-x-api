import { promises } from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';

import { DeleteDTO, IStorageProvider, SaveDTO } from '../IStorageProvider';

export class DiskStorageProvider implements IStorageProvider {
  private async checkIfFileExists(path: string) {
    try {
      await promises.stat(resolve(path));

      return true;
    } catch (error) {
      return false;
    }
  }

  private async checkIfFolderExists(path: string) {
    try {
      await promises.access(resolve(path));

      return true;
    } catch (error) {
      return false;
    }
  }

  private async createFolder(path: string) {
    await promises.mkdir(resolve(path), { recursive: false });
  }

  async save(data: SaveDTO): Promise<string> {
    const { folder_name, file_name } = data;

    const tmpFolderExists = await this.checkIfFolderExists(
      uploadConfig.tmpFolder
    );

    if (!tmpFolderExists) {
      await this.createFolder(uploadConfig.tmpFolder);
    }

    const targetFolder = resolve(uploadConfig.tmpFolder, folder_name);

    const targetFolderExists = await this.checkIfFolderExists(targetFolder);

    if (!targetFolderExists) {
      await this.createFolder(targetFolder);
    }

    const from = resolve(uploadConfig.tmpFolder, file_name);
    const to = resolve(targetFolder, file_name);

    await promises.rename(from, to);

    return file_name;
  }

  async delete(data: DeleteDTO): Promise<void> {
    const { folder_name, file_name } = data;

    const filePath = resolve(uploadConfig.tmpFolder, folder_name, file_name);

    const exists = await this.checkIfFileExists(filePath);

    if (!exists) {
      throw new Error('File does not exists');
    }

    await promises.unlink(filePath);
  }
}
