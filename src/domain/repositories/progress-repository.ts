import type { GameProgress, ProgressState } from "../entities/progress";

export interface IProgressRepository {
  /**
   * Get progress for a specific game
   */
  getProgress(gameSlug: string): GameProgress;

  /**
   * Save progress for a specific game
   */
  saveProgress(gameSlug: string, progress: GameProgress): void;

  /**
   * Get progress for all games
   */
  getAllProgress(): ProgressState;

  /**
   * Save platinum backup for a game (before marking all trophies complete)
   */
  savePlatinumBackup(gameSlug: string, trophyIds: string[]): void;

  /**
   * Restore platinum backup for a game
   * @returns The backed up trophy IDs, or null if no backup exists
   */
  restorePlatinumBackup(gameSlug: string): string[] | null;

  /**
   * Check if a platinum backup exists for a game
   */
  hasPlatinumBackup(gameSlug: string): boolean;

  /**
   * Clear platinum backup for a game
   */
  clearPlatinumBackup(gameSlug: string): void;
}
