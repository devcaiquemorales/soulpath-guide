"use client";

import { useCallback, useState } from "react";
import type { GameProgress, ProgressInfo } from "@/domain/entities";
import { progressRepository } from "@/infrastructure/repositories";
import { toggleTaskInProgress } from "../services/progress-service";

export const useTaskProgress = (gameSlug: string) => {
  const [progress, setProgress] = useState<GameProgress>(() => 
    progressRepository.getProgress(gameSlug)
  );
  const isLoaded = true; // Data is loaded synchronously from localStorage

  const isTaskComplete = useCallback(
    (taskId: string): boolean => {
      return progress.completedTasks.includes(taskId);
    },
    [progress.completedTasks]
  );

  const toggleTask = useCallback(
    (taskId: string): void => {
      setProgress((prev) => {
        const newProgress = toggleTaskInProgress(prev, taskId);
        progressRepository.saveProgress(gameSlug, newProgress);
        return newProgress;
      });
    },
    [gameSlug]
  );

  const getChecklistProgress = useCallback(
    (totalTasks: number): ProgressInfo => ({
      completed: progress.completedTasks.length,
      total: totalTasks,
    }),
    [progress.completedTasks.length]
  );

  return {
    isLoaded,
    isTaskComplete,
    toggleTask,
    getChecklistProgress,
    completedTasksCount: progress.completedTasks.length,
  };
};
