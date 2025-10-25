import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const wrongFilenamePath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const properFilenamePath = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.access(wrongFilenamePath);
  } catch {
    throw new Error('FS operation failed');
  }

  try {
    await fs.access(properFilenamePath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
  await fs.rename(wrongFilenamePath, properFilenamePath);
};

await rename();
