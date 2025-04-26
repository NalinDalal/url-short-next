import { createClient, RedisClientType } from "redis";

const redisClients: RedisClientType[] = [
  createClient({ url: `redis://localhost:6379` }),
  createClient({ url: `redis://localhost:6379` }),
  createClient({ url: `redis://localhost:6379` }),
];

export const connectRedis = async () => {
  await Promise.all(redisClients.map((client) => client.connect()));
  console.log("All Redis clients connected");
};

export const getRedisClient = (key: string): RedisClientType => {
  const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return redisClients[hash % redisClients.length];
};
