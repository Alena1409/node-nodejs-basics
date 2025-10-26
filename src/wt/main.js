import { Worker } from 'node:worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workerPath = path.join(__dirname, 'worker.js');

  const cores = os.cpus().length;

  const startNumber = 10;
  const workers = [];

  for (let i = 0; i < cores; i++) {
    const n = startNumber + i;

    const promise  = new Promise((resolve) => {
      const worker = new Worker(workerPath);

      worker.postMessage(n);

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
        worker.terminate();
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });

    workers.push(promise);
  }

  const results = await Promise.all(workers);
  console.log(results);
};

await performCalculations();
