import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import {createGunzip} from 'zlib'
import { pipeline } from 'stream/promises';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const fileToCompressPath = path.join(__dirname, 'files', 'fileToCompress.txt')
    const archivePath = path.join(__dirname, 'files', 'archive.gz')

    const readStream = fs.createReadStream(archivePath)
    const writeStream = fs.createWriteStream(fileToCompressPath)
    const zipStream = createGunzip()

    try {
      await pipeline(readStream, zipStream, writeStream)
    } catch(err) {
      throw new Error('FS operation failed')
    }
};

await decompress();
