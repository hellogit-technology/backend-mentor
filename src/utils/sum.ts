export const sumScores = (arrayScores: number[]) => {
    const sum = arrayScores.reduce((partialSum, a) => partialSum + a, 0);
    return sum
}