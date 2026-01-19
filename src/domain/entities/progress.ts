export type GameProgress = {
  completedTasks: string[];
  completedTrophies: string[];
  completedSubItems: string[];
};

export type ProgressState = Record<string, GameProgress>;

export type PlatinumBackupState = Record<string, string[]>;

export type ProgressInfo = {
  completed: number;
  total: number;
};

export const createEmptyGameProgress = (): GameProgress => ({
  completedTasks: [],
  completedTrophies: [],
  completedSubItems: [],
});
