import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import {createGzip} from 'zlib'
import { pipeline } from 'stream/promises';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const fileToCompressPath = path.join(__dirname, 'files', 'fileToCompress.txt')
  const archivePath = path.join(__dirname, 'files', 'archive.gz')

  const readStream = fs.createReadStream(fileToCompressPath)
  const writeStream = fs.createWriteStream(archivePath)
  const zipStream = createGzip()

  try {
    await pipeline(readStream, zipStream, writeStream)
  } catch(err) {
    throw new Error('FS operation failed')
  }
}
await compress();
