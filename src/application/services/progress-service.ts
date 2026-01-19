import type { GameProgress } from "@/domain/entities";
import { createEmptyGameProgress } from "@/domain/entities";

/**
 * Toggles a task in the completed tasks list
 */
export const toggleTaskInProgress = (
  progress: GameProgress,
  taskId: string
): GameProgress => {
  const isComplete = progress.completedTasks.includes(taskId);

  return {
    ...progress,
    completedTasks: isComplete
      ? progress.completedTasks.filter((id) => id !== taskId)
      : [...progress.completedTasks, taskId],
  };
};

/**
 * Toggles a trophy in the completed trophies list
 */
export const toggleTrophyInProgress = (
  progress: GameProgress,
  trophyId: string
): GameProgress => {
  const isComplete = progress.completedTrophies.includes(trophyId);

  return {
    ...progress,
    completedTrophies: isComplete
      ? progress.completedTrophies.filter((id) => id !== trophyId)
      : [...progress.completedTrophies, trophyId],
  };
};

/**
 * Toggles a sub-item in the completed sub-items list
 */
export const toggleSubItemInProgress = (
  progress: GameProgress,
  subItemId: string
): GameProgress => {
  const completedSubItems = progress.completedSubItems ?? [];
  const isComplete = completedSubItems.includes(subItemId);

  return {
    ...progress,
    completedSubItems: isComplete
      ? completedSubItems.filter((id) => id !== subItemId)
      : [...completedSubItems, subItemId],
  };
};

/**
 * Sets all trophies as complete or incomplete
 */
export const setAllTrophiesInProgress = (
  progress: GameProgress,
  trophyIds: string[],
  enable: boolean
): GameProgress => {
  let newCompletedTrophies: string[];

  if (enable) {
    const uniqueTrophies = new Set([
      ...progress.completedTrophies,
      ...trophyIds,
    ]);
    newCompletedTrophies = Array.from(uniqueTrophies);
  } else {
    newCompletedTrophies = progress.completedTrophies.filter(
      (id) => !trophyIds.includes(id)
    );
  }

  return {
    ...progress,
    completedTrophies: newCompletedTrophies,
  };
};

/**
 * Restores trophy state from a backup
 */
export const restoreTrophiesFromBackup = (
  progress: GameProgress,
  backup: string[]
): GameProgress => ({
  ...progress,
  completedTrophies: [...backup],
});

/**
 * Resets all progress for a game
 */
export const resetProgress = (): GameProgress => createEmptyGameProgress();

/**
 * Calculates sub-item progress for a trophy
 */
export const calculateSubItemProgress = (
  completedSubItems: string[],
  subItemIds: string[]
): { completed: number; total: number } => {
  const completed = subItemIds.filter((id) =>
    completedSubItems.includes(id)
  ).length;

  return {
    completed,
    total: subItemIds.length,
  };
};
