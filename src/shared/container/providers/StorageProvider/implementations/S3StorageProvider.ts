import { S3 } from 'aws-sdk';
import { promises } from 'fs';
import { getType } from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';

import { DeleteDTO, IStorageProvider, SaveDTO } from '../IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_S3_BUCKET_REGION,
    });
  }

  async save(data: SaveDTO): Promise<string> {
    const { file_name, folder_name } = data;

    const filePath = resolve(upload.tmpFolder, file_name);

    const fileBuffer = await promises.readFile(filePath);

    const contentType = getType(filePath);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}/${folder_name}`,
        Key: file_name,
        ACL: 'public-read',
        Body: fileBuffer,
        ContentType: contentType,
      })
      .promise();

    // TODO: Seria interessante fazer a remoção do temp no use case, não aqui

    await promises.unlink(filePath);

    return file_name;
  }

  async delete(data: DeleteDTO): Promise<void> {
    const { file_name, folder_name } = data;

    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}/${folder_name}`,
        Key: file_name,
      })
      .promise();
  }
}
