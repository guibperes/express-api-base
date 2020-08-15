import http, { Server } from 'http';
import express, { Express, Router, RequestHandler } from 'express';
import 'express-async-errors';

import { Cors, logger, loggerMiddleware } from '../libs';
import { notFoundMiddleware, errorMiddleware } from '../middlewares';

export interface HttpServerCreateOptions {
  useJsonBody?: boolean;
  useCors?: boolean;
  useLogger?: boolean;
  useNotFoundMiddleware?: boolean;
  useErrorMiddleware?: boolean;
  applicationRoutes: Router;
  port: number;
  beforeApplicationRoutesMiddlewares?: RequestHandler[][];
  startFunction?: () => Promise<any>;
  shutdownFunction?: () => Promise<any>;
}

interface HttpServerInstances {
  http: Server;
  express: Express;
}

export interface HttpServerInstance {
  instances: HttpServerInstances;
  start: () => Promise<void>;
  shutdown: () => Promise<never>;
}

const create = ({
  applicationRoutes,
  port,
  shutdownFunction = async () => {},
  startFunction = async () => {},
  useCors = true,
  useErrorMiddleware = true,
  useJsonBody = true,
  useLogger = true,
  useNotFoundMiddleware = true,
  beforeApplicationRoutesMiddlewares = [],
}: HttpServerCreateOptions): HttpServerInstance => {
  const app = express();
  const server = http.createServer(app);

  if (useJsonBody) app.use(express.json());
  if (useCors) app.use(Cors.config());
  if (useLogger) app.use(loggerMiddleware);

  beforeApplicationRoutesMiddlewares.forEach(middleware =>
    app.use(...middleware)
  );

  app.use(applicationRoutes);

  if (useNotFoundMiddleware) app.use('*', notFoundMiddleware);
  if (useErrorMiddleware) app.use(errorMiddleware);

  const start = async () => {
    try {
      logger.info('Server startup process started');

      await startFunction();

      server.listen(port, () =>
        logger.info(`Server is running on port ${port}`)
      );
    } catch (error) {
      logger.info('Server startup internal server error');
      logger.error(error);

      process.exit(1);
    }
  };

  const shutdown = async () => {
    try {
      logger.info('Server shutdown process started');

      await shutdownFunction();
      server.close();

      logger.info('Server shutdown process finished');
      process.exit(0);
    } catch (error) {
      logger.info('Server shutdown internal server error');
      logger.error(error);

      process.exit(1);
    }
  };

  return { instances: { express: app, http: server }, start, shutdown };
};

export const HttpServer = { create };
