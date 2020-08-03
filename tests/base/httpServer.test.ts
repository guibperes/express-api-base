import { Server } from 'http';
import { Router } from 'express';
import request from 'supertest';

import { HttpServer } from '../../src/base/httpServer';

const realProcess = process;

describe('Lib HttpServer', () => {
  beforeEach(() => {
    global.process = { ...realProcess, exit: jest.fn<never, [number]>() };
  });

  afterEach(() => {
    global.process = realProcess;
  });

  test('should HttpServer module be defined', () => {
    expect(HttpServer).toBeDefined();
  });

  test('should function create be defined', () => {
    expect(HttpServer.create).toBeInstanceOf(Function);
  });

  test('should create a http server with default parameters', () => {
    const server = HttpServer.create({ port: 0, applicationRoutes: Router() });

    expect(server).toBeDefined();
    expect(server.instances).toBeDefined();
    expect(server.instances.express).toBeDefined();
    expect(server.instances.http).toBeInstanceOf(Server);
    expect(server.start).toBeInstanceOf(Function);
    expect(server.shutdown).toBeInstanceOf(Function);
  });

  test('should create a http server with optional parameters', () => {
    const startFunction = jest.fn<Promise<any>, []>();
    const shutdownFunction = jest.fn<Promise<any>, []>();

    const server = HttpServer.create({
      port: 0,
      applicationRoutes: Router(),
      useJsonBody: false,
      useCors: false,
      useLogger: false,
      useNotFoundMiddleware: false,
      useErrorMiddleware: false,
      startFunction,
      shutdownFunction,
    });

    expect(server).toBeDefined();
    expect(server.instances).toBeDefined();
    expect(server.instances.express).toBeDefined();
    expect(server.instances.http).toBeInstanceOf(Server);
    expect(server.start).toBeInstanceOf(Function);
    expect(server.shutdown).toBeInstanceOf(Function);
  });

  test('should create, start and close a server with default parameters', async () => {
    const server = HttpServer.create({ port: 0, applicationRoutes: Router() });

    await server.start();
    await server.shutdown();

    expect(process.exit).toBeCalledWith(0);
  });

  test('should create, start and close a server with optional parameters', async () => {
    const startFunction = jest.fn<Promise<any>, []>();
    const shutdownFunction = jest.fn<Promise<any>, []>();

    const server = HttpServer.create({
      port: 0,
      applicationRoutes: Router(),
      startFunction,
      shutdownFunction,
    });

    await server.start();
    await server.shutdown();

    expect(startFunction).toBeCalledTimes(1);
    expect(shutdownFunction).toBeCalledTimes(1);
    expect(process.exit).toBeCalledWith(0);
  });

  test('should create, start and throw error in server start function', async () => {
    const startFunction = async () => {
      throw new Error('Some error');
    };

    const server = HttpServer.create({
      port: 0,
      applicationRoutes: Router(),
      startFunction,
    });

    await server.start();

    expect(process.exit).toBeCalledWith(1);
  });

  test('should create, start and throw error in server shutdown function', async () => {
    const shutdownFunction = async () => {
      throw new Error('Some error');
    };

    const server = HttpServer.create({
      port: 0,
      applicationRoutes: Router(),
      shutdownFunction,
    });

    await server.shutdown();

    expect(process.exit).toBeCalledWith(1);
  });

  test('should create, and execute a http GET on /status route', async () => {
    const routes = Router();
    routes.get('/status', (req, res) => res.json({ ok: true }));

    const server = HttpServer.create({ port: 0, applicationRoutes: routes });
    const response = await request(server.instances.http).get('/status');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
