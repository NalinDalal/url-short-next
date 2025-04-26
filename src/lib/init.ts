import { connectRedis } from "@/app/models/redis";

let initialized = false;

export const initializeApp = async () => {
  if (!initialized) {
    await connectRedis();
    initialized = true;
  }
};
