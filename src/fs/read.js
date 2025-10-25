import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToReadPath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    await fs.access(fileToReadPath);
  } catch {
    throw new Error('FS operation failed');
  }

  try {
    const dataFile = await fs.readFile(fileToReadPath, 'utf-8');
    console.log(dataFile);
  } catch {
    throw new Error('FS operation failed2');
  }
};

await read();
