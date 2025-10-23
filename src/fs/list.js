import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filesPath = path.join(__dirname, 'files');

  try {
    await fs.access(filesPath);
  } catch {
    throw new Error('FS operation failed');
  }

  try{
    const arrFiles = await fs.readdir(filesPath)
    console.log(arrFiles)
  } catch {
    throw new Error('FS operation failed');
  }

};

await list();
