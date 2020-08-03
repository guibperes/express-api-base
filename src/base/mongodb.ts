import mongoose, { ConnectionOptions } from 'mongoose';

import { logger } from '../libs';

const connect = async (url: string, options: ConnectionOptions = {}) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      ...options,
    });

    logger.info('Connected to database');
  } catch (error) {
    logger.info('Cannot connect to database');
    logger.error(error);

    process.exit(1);
  }
};

const disconnect = async () => {
  await mongoose.disconnect();

  logger.info('Disconnected from database');
};

export const MongoDB = { connect, disconnect };
