import type { IProgressRepository } from "@/domain/repositories/progress-repository";
import type {
  GameProgress,
  ProgressState,
  PlatinumBackupState,
} from "@/domain/entities/progress";
import { createEmptyGameProgress } from "@/domain/entities/progress";
import { createLocalStorageAdapter } from "../storage/local-storage-adapter";

const STORAGE_KEY = "soulpath-progress";
const PLATINUM_BACKUP_KEY = "soulpath-platinum-backup";

export class LocalStorageProgressRepository implements IProgressRepository {
  private progressStorage = createLocalStorageAdapter<ProgressState>(STORAGE_KEY);
  private platinumBackupStorage = createLocalStorageAdapter<PlatinumBackupState>(PLATINUM_BACKUP_KEY);

  getProgress(gameSlug: string): GameProgress {
    const state = this.progressStorage.get() ?? {};
    return state[gameSlug] ?? createEmptyGameProgress();
  }

  saveProgress(gameSlug: string, progress: GameProgress): void {
    const state = this.progressStorage.get() ?? {};
    state[gameSlug] = progress;
    this.progressStorage.set(state);
  }

  getAllProgress(): ProgressState {
    return this.progressStorage.get() ?? {};
  }

  savePlatinumBackup(gameSlug: string, trophyIds: string[]): void {
    const backups = this.platinumBackupStorage.get() ?? {};
    backups[gameSlug] = [...trophyIds];
    this.platinumBackupStorage.set(backups);
  }

  restorePlatinumBackup(gameSlug: string): string[] | null {
    const backups = this.platinumBackupStorage.get() ?? {};
    const backup = backups[gameSlug];

    if (backup) {
      // Clear the backup after restoring
      delete backups[gameSlug];
      this.platinumBackupStorage.set(backups);
      return [...backup];
    }

    return null;
  }

  hasPlatinumBackup(gameSlug: string): boolean {
    const backups = this.platinumBackupStorage.get() ?? {};
    return gameSlug in backups;
  }

  clearPlatinumBackup(gameSlug: string): void {
    const backups = this.platinumBackupStorage.get() ?? {};
    if (gameSlug in backups) {
      delete backups[gameSlug];
      this.platinumBackupStorage.set(backups);
    }
  }
}

// Singleton instance for the application
export const progressRepository = new LocalStorageProgressRepository();
