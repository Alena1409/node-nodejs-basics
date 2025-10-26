const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsPairs = [];

  for (let i = 0; i < args.length; i += 2) {
    if (args[i] && args[i + 1]) {
      argsPairs.push([args[i], args[i + 1]]);
    }
  }

  const result = argsPairs
    .map(([key, value]) => {
      const name = key.startsWith('--')
        ? key.slice(2)
        : key;
      return `${name} is ${value}`;
    })
    .join(', ');

  console.log(result);
};

parseArgs();
