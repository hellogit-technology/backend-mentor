export const sumScores = (arrayScores: number[]) => {
  return arrayScores.reduce((partialSum, a) => partialSum + a, 0);
};
