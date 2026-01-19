"use client";

import { useCallback, useState } from "react";
import type { ProgressState } from "@/domain/entities";
import { progressRepository } from "@/infrastructure/repositories";

export const useAllGamesProgress = () => {
  const [state] = useState<ProgressState>(() =>
    progressRepository.getAllProgress()
  );
  const isLoaded = true; // Data is loaded synchronously from localStorage

  const getGameProgress = useCallback(
    (gameSlug: string) => {
      const progress = state[gameSlug];
      if (!progress) {
        return { completedTasks: 0, completedTrophies: 0 };
      }
      return {
        completedTasks: progress.completedTasks.length,
        completedTrophies: progress.completedTrophies.length,
      };
    },
    [state]
  );

  return {
    isLoaded,
    getGameProgress,
  };
};
