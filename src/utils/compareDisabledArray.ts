export const compareDisabledArrays = (array1: any, array2: any) => {
  return array1.map((obj1: { dictionaryId: string }) => {
    if (!obj1 || !obj1.dictionaryId) {
      return obj1;
    }
    const match = array2.find(
      (obj2: { dictionaryId: string }) =>
        obj2 && obj2.dictionaryId === obj1.dictionaryId
    );
    return {
      ...obj1,
      disabled: Boolean(match),
    };
  });
};
