import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const freshPath = path.join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try{
    await fs.writeFile(freshPath, content, { flag: 'wx' })
  } catch(err) {
    if(err.code === "EEXIST") {
      throw new Error('FS operation failed')
    }
    throw new Error('FS operation failed: unknown error')
  }
};

await create();
