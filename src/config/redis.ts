import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URI
});

client.on('connect', () => {
  console.log('Redis client connected 🎉');
});

client.on('error', (error) => {
  console.log('Connect failed ⛔');
});

export default client;
