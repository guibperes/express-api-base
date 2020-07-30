export const getValueByObjectPath = (
  searchObject: { [unit: string]: any },
  ...path: string[]
): any =>
  path.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    searchObject
  );
