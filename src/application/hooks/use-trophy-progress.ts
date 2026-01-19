"use client";

import { useCallback, useState } from "react";
import type { GameProgress, ProgressInfo } from "@/domain/entities";
import { progressRepository } from "@/infrastructure/repositories";
import {
  toggleTrophyInProgress,
  toggleSubItemInProgress,
  setAllTrophiesInProgress,
  restoreTrophiesFromBackup,
  calculateSubItemProgress,
} from "../services/progress-service";

export const useTrophyProgress = (gameSlug: string) => {
  const [progress, setProgress] = useState<GameProgress>(() =>
    progressRepository.getProgress(gameSlug)
  );
  const isLoaded = true; // Data is loaded synchronously from localStorage

  const isTrophyComplete = useCallback(
    (trophyId: string): boolean => {
      return progress.completedTrophies.includes(trophyId);
    },
    [progress.completedTrophies]
  );

  const toggleTrophy = useCallback(
    (trophyId: string): void => {
      setProgress((prev) => {
        const newProgress = toggleTrophyInProgress(prev, trophyId);
        progressRepository.saveProgress(gameSlug, newProgress);
        return newProgress;
      });
    },
    [gameSlug]
  );

  const toggleAllTrophies = useCallback(
    (trophyIds: string[], enable: boolean): void => {
      setProgress((prev) => {
        const newProgress = setAllTrophiesInProgress(prev, trophyIds, enable);
        progressRepository.saveProgress(gameSlug, newProgress);
        return newProgress;
      });
    },
    [gameSlug]
  );

  const savePlatinumBackupForGame = useCallback((): void => {
    progressRepository.savePlatinumBackup(gameSlug, progress.completedTrophies);
  }, [gameSlug, progress.completedTrophies]);

  const restorePlatinumBackupForGame = useCallback((): void => {
    const backup = progressRepository.restorePlatinumBackup(gameSlug);
    if (backup) {
      setProgress((prev) => {
        const newProgress = restoreTrophiesFromBackup(prev, backup);
        progressRepository.saveProgress(gameSlug, newProgress);
        return newProgress;
      });
    }
  }, [gameSlug]);

  const hasPlatinumBackup = useCallback((): boolean => {
    return progressRepository.hasPlatinumBackup(gameSlug);
  }, [gameSlug]);

  // Sub-item methods
  const isSubItemComplete = useCallback(
    (subItemId: string): boolean => {
      return progress.completedSubItems?.includes(subItemId) ?? false;
    },
    [progress.completedSubItems]
  );

  const toggleSubItem = useCallback(
    (subItemId: string): void => {
      setProgress((prev) => {
        const newProgress = toggleSubItemInProgress(prev, subItemId);
        progressRepository.saveProgress(gameSlug, newProgress);
        return newProgress;
      });
    },
    [gameSlug]
  );

  const getSubItemProgress = useCallback(
    (subItemIds: string[]): ProgressInfo => {
      return calculateSubItemProgress(
        progress.completedSubItems ?? [],
        subItemIds
      );
    },
    [progress.completedSubItems]
  );

  const getTrophyProgress = useCallback(
    (totalTrophies: number): ProgressInfo => ({
      completed: progress.completedTrophies.length,
      total: totalTrophies,
    }),
    [progress.completedTrophies.length]
  );

  return {
    isLoaded,
    isTrophyComplete,
    toggleTrophy,
    toggleAllTrophies,
    savePlatinumBackupForGame,
    restorePlatinumBackupForGame,
    hasPlatinumBackup,
    isSubItemComplete,
    toggleSubItem,
    getSubItemProgress,
    getTrophyProgress,
    completedTrophiesCount: progress.completedTrophies.length,
  };
};
