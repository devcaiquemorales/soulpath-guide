import type { Game, GameData, ChecklistStep } from "@/domain/entities";

// Import game data from existing data files
import { GAMES as GAMES_LIST, getGameData as getGameDataFromRegistry, hasGameData as checkHasGameData } from "@/data/games";

/**
 * Get all available games
 */
export const getAllGames = (): Game[] => GAMES_LIST;

/**
 * Get game by slug
 */
export const getGameBySlug = (slug: string): Game | undefined => {
  return GAMES_LIST.find((game) => game.slug === slug);
};

/**
 * Get full game data by slug
 */
export const getGameData = (slug: string): GameData | undefined => {
  return getGameDataFromRegistry(slug);
};

/**
 * Check if game has data available
 */
export const hasGameData = (slug: string): boolean => {
  return checkHasGameData(slug);
};

/**
 * Calculate total tasks in a checklist
 */
export const calculateTotalTasks = (checklist: ChecklistStep[]): number => {
  return checklist.reduce((total, step) => total + step.tasks.length, 0);
};

/**
 * Find the first incomplete step index in a checklist
 */
export const findFirstIncompleteStepIndex = (
  checklist: ChecklistStep[],
  isTaskComplete: (taskId: string) => boolean
): number => {
  return checklist.findIndex((step) =>
    step.tasks.some((task) => !isTaskComplete(task.id))
  );
};
