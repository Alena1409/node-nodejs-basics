import crypto from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const readStream = createReadStream(filePath);
  const hashStream = crypto.createHash('sha256');

  try {
    await pipeline(readStream, hashStream);
    const hashHex = hashStream.digest('hex');
    console.log(hashHex);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

await calculateHash();
