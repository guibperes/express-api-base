import { MongoDB } from '../../src/base/mongodb';
import { MongoMemoryInstance } from '../mocks';

const mongod = MongoMemoryInstance.getInstance();

describe('Base MongoDB', () => {
  beforeAll(async () => {
    await mongod.start();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  test('should MongoDB module be defined', () => {
    expect(MongoDB).toBeDefined();
  });

  test('should function connect be defined', () => {
    expect(MongoDB.connect).toBeInstanceOf(Function);
  });

  test('should function disconnect be defined', () => {
    expect(MongoDB.disconnect).toBeInstanceOf(Function);
  });

  test('should connect and disconnect to database with default options', async () => {
    const connectionString = await mongod.getConnectionString();

    await MongoDB.connect(connectionString);
    await MongoDB.disconnect();
  });

  test('should connect and disconnect to database applying custom options', async () => {
    const connectionString = await mongod.getConnectionString();

    await MongoDB.connect(connectionString, { autoReconnect: true });
    await MongoDB.disconnect();
  });

  test('should try to connect on database and exit process with code 1', async () => {
    const realProcess = process;
    global.process = { ...realProcess, exit: jest.fn<never, [number]>() };

    await MongoDB.connect('not_a_connection_string');

    expect(process.exit).toBeCalledWith(1);

    global.process = realProcess;
  });
});
