import { stat, unlink } from 'fs/promises';
import { resolve } from 'path';

async function checkIfFileExists(filePath: string): Promise<boolean> {
  try {
    await stat(resolve(filePath));

    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  const path = resolve(filePath);

  const exists = await checkIfFileExists(path);

  if (!exists) {
    return;
  }

  await unlink(path);
}
