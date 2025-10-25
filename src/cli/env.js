const parseEnv = () => {
  const env = process.env;
  const envEntries = Object.entries(env);
  const filter = envEntries
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')

  console.log(filter);
};

parseEnv();
