// utils/level.ts

export type Level =
  | "Unknown"
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

export const getNextLevelInfo = (progression?: number) => {
  if (progression === undefined) return null;

  if (progression < 3)
    return { nextLevel: "Intermediate", pointsToNext: 3 - progression };
  if (progression < 6)
    return { nextLevel: "Advanced", pointsToNext: 6 - progression };
  if (progression < 8)
    return { nextLevel: "Expert", pointsToNext: 8 - progression };

  return null;
};

export const getProgressionLabel = (level?: number): Level => {
  if (level === undefined) return "Unknown";
  if (level < 3) return "Beginner";
  if (level < 6) return "Intermediate";
  if (level < 8) return "Advanced";
  return "Expert";
};

export const levelColor = (level: Level): string => {
  const colors: Record<Level, string> = {
    Unknown: "bg-gray-500",
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-400",
    Advanced: "bg-blue-600",
    Expert: "bg-red-700",
  };
  return colors[level] || "bg-gray-500";
};

export const mapLevel = (level: string): Level => {
  const formatted =
    level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
  const validLevels: Level[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ];
  return validLevels.includes(formatted as Level)
    ? (formatted as Level)
    : "Unknown";
};
