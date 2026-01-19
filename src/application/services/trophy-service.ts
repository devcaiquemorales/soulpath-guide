import type { Trophy, TrophyType, ProgressInfo } from "@/domain/entities";

export const TROPHY_TYPE_ORDER: TrophyType[] = ["platinum", "gold", "silver", "bronze"];

export const TROPHY_TYPE_LABELS: Record<TrophyType, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

/**
 * Groups trophies by their type
 */
export const groupTrophiesByType = (
  trophies: Trophy[]
): Record<TrophyType, Trophy[]> => {
  const groups: Record<TrophyType, Trophy[]> = {
    platinum: [],
    gold: [],
    silver: [],
    bronze: [],
  };

  for (const trophy of trophies) {
    groups[trophy.type].push(trophy);
  }

  return groups;
};

/**
 * Calculates progress info from completed items
 */
export const calculateProgress = (
  completedCount: number,
  total: number
): ProgressInfo => ({
  completed: completedCount,
  total,
});

/**
 * Calculates progress percentage
 */
export const calculateProgressPercentage = (
  completed: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Finds the platinum trophy in a list of trophies
 */
export const findPlatinumTrophy = (trophies: Trophy[]): Trophy | undefined => {
  return trophies.find((t) => t.type === "platinum");
};

/**
 * Gets all trophy IDs from a list of trophies
 */
export const getAllTrophyIds = (trophies: Trophy[]): string[] => {
  return trophies.map((t) => t.id);
};

/**
 * Gets sub-item IDs from a trophy
 */
export const getTrophySubItemIds = (trophy: Trophy): string[] => {
  return trophy.subItems?.map((s) => s.id) ?? [];
};
