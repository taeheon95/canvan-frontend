// 두 함수 모두 객체의 얕은 복사를 이용하여 만든 함수이다.
// 따라서 둘 다 deepclone 된 객체에서 사용해야 한다.
export const reorderInSameList = <T>(
  listArray: T[],
  startIndex: number,
  endIndex: number
) => {
  const [removed] = listArray.splice(startIndex, 1);
  listArray.splice(endIndex, 0, removed);
};

export const reorderNotSameList = <T>(
  startList: T[],
  endList: T[],
  startIdx: number,
  endIdx: number
) => {
  const [removed] = startList.splice(startIdx, 1);
  endList.splice(endIdx, 0, removed);
};
