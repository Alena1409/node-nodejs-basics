import { Transform } from 'stream';

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    },
  });

  process.stdin.pipe(reverse).pipe(process.stdout);
};

await transform();
