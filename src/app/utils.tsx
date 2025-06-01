export const getNextLevelInfo = (progression: number | undefined) => {
  if (progression === undefined) return null;

  if (progression < 3)
    return { nextLevel: "Intermediate", pointsToNext: 3 - progression };
  if (progression < 6)
    return { nextLevel: "Advanced", pointsToNext: 6 - progression };
  if (progression < 8)
    return { nextLevel: "Expert", pointsToNext: 8 - progression };
  if (progression >= 8) return null; // max level

  return null;
};
