import { MongoMemoryServer } from 'mongodb-memory-server';

let instance: MongoMemoryServer | null = null;

const getInstance = (): MongoMemoryServer => {
  if (!instance) {
    instance = new MongoMemoryServer();
  }

  return instance;
};

export const MongoMemoryInstance = { getInstance };
