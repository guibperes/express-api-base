import { modelToJSONFilter } from '../../src/libs/modelToJSONFilter';

import { DocumentMock } from '../mocks';

describe('Lib modelToJSONFilter', () => {
  test('should modelToJSONFilter return a function', () => {
    expect(modelToJSONFilter()).toBeInstanceOf(Function);
  });

  test('should parameters be removed by default', () => {
    const document = DocumentMock.create({ name: 'Guilherme' });

    const filteredDocument = modelToJSONFilter()(document, document);

    expect(filteredDocument._id).toBeUndefined();
    expect(filteredDocument.__v).toBeUndefined();
    expect(filteredDocument.createdAt).toBeUndefined();
    expect(filteredDocument.updatedAt).toBeUndefined();
    expect(filteredDocument.name).toBeDefined();
  });

  test('should password parameter be removed', () => {
    const document = DocumentMock.create({
      name: 'Guilherme',
      password: '112233',
    });

    const filteredDocument = modelToJSONFilter('password')(document, document);

    expect(filteredDocument.password).toBeUndefined();
    expect(filteredDocument.name).toBeDefined();
  });
});
