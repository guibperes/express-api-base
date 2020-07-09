import httpMocks, { RequestOptions, ResponseOptions } from 'node-mocks-http';

const createRequest = (options: RequestOptions = {}) =>
  httpMocks.createRequest(options);

const createResponse = (options: ResponseOptions = {}) =>
  httpMocks.createResponse(options);

const createNextFunction = () => jest.fn();

export const HTTPMock = { createRequest, createResponse, createNextFunction };
