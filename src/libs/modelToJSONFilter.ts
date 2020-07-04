export const modelToJSONFilter = (...paramsToRemove: string[]) => (
  doc: any,
  ret: any
) => {
  const params = ['_id', '__v', 'createdAt', 'updatedAt', ...paramsToRemove];
  const id = ret._id;

  const filteredObject = params.reduce(
    (acc, value) => ({ ...acc, [value]: undefined }),
    ret
  );

  return {
    id,
    ...filteredObject,
  };
};
