export const getNextLevelInfo = (progression: number | undefined) => {
  if (progression === undefined) return null;

  if (progression < 3)
    return { nextLevel: "Intermediate", pointsToNext: 3 - progression };
  if (progression < 6)
    return { nextLevel: "Advanced", pointsToNext: 6 - progression };
  if (progression < 8)
    return { nextLevel: "Expert", pointsToNext: 8 - progression };
  if (progression >= 8) return null;

  return null;
};

export const getProgressionLabel = (level: number | undefined) => {
  if (level === undefined) return "Unknown";
  if (level < 3) return "Beginner";
  if (level < 7) return "Intermediate";
  return "Advanced";
};

type Level = "Unknown" | "Beginner" | "Intermediate" | "Advanced" | "Expert";

export const levelColor = (level: Level): string => {
  const colors: Record<Level, string> = {
    Unknown: "bg-gray-500",
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-400",
    Advanced: "bg-blue-600",
    Expert: "bg-red-700",
  };
  if (level in colors) {
    return colors[level as Level];
  }

  // Fallback for unknown strings
  return level;
};
