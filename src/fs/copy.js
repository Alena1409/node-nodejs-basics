import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesPath = path.join(__dirname, 'files');
  const filesCopyPath = path.join(__dirname, 'files_copy');

  try {
    await fs.access(filesPath);
  } catch (err) {
    throw new Error('FS operation failed');
  }

  try {
    await fs.access(filesCopyPath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }

  await fs.cp(filesPath, filesCopyPath, { recursive: true });
};

await copy();
