import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToReadPath = path.join(__dirname, 'files', 'fileToRead.txt');
  const stream = fs.createReadStream(fileToReadPath, 'utf-8');
  stream.pipe(process.stdout)
};

await read();
