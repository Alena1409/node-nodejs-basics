import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToWritePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const streamWrite = fs.createWriteStream(fileToWritePath);

  process.stdin.pipe(streamWrite)
};

await write();
