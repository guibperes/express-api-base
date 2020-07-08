import faker from 'faker';

const create = (properties: object) => ({
  _id: faker.random.number({ min: 100, max: 1000 }),
  __v: faker.random.number({ min: 1, max: 10 }),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  ...properties,
});

export const DocumentMock = { create };
