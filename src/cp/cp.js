import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const scriptPath = path.join(__dirname, 'files', 'script.js');
  const child = spawn('node', [scriptPath, ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.stderr.on('data', (data) => {
    console.error(`Child Process Error: ${data.toString()}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['--user', 'Name']);
