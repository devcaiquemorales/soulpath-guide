"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "soulpath-progress";

type GameProgress = {
  completedTasks: string[];
  completedTrophies: string[];
};

type ProgressState = Record<string, GameProgress>;

function getInitialState(): ProgressState {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load progress from localStorage:", e);
  }

  return {};
}

function saveState(state: ProgressState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save progress to localStorage:", e);
  }
}

export function useProgress(gameSlug: string) {
  const [state, setState] = useState<ProgressState>(() => getInitialState());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    setState(getInitialState());
    setIsLoaded(true);
  }, []);

  // Get game progress, creating empty if not exists
  const getGameProgress = useCallback(
    (slug: string): GameProgress => {
      return (
        state[slug] || {
          completedTasks: [],
          completedTrophies: [],
        }
      );
    },
    [state]
  );

  const gameProgress = getGameProgress(gameSlug);

  // Task methods
  const isTaskComplete = useCallback(
    (taskId: string): boolean => {
      return gameProgress.completedTasks.includes(taskId);
    },
    [gameProgress.completedTasks]
  );

  const toggleTask = useCallback(
    (taskId: string): void => {
      setState((prev) => {
        const current = prev[gameSlug] || {
          completedTasks: [],
          completedTrophies: [],
        };
        const isComplete = current.completedTasks.includes(taskId);

        const newProgress: GameProgress = {
          ...current,
          completedTasks: isComplete
            ? current.completedTasks.filter((id) => id !== taskId)
            : [...current.completedTasks, taskId],
        };

        const newState = {
          ...prev,
          [gameSlug]: newProgress,
        };

        saveState(newState);
        return newState;
      });
    },
    [gameSlug]
  );

  // Trophy methods
  const isTrophyComplete = useCallback(
    (trophyId: string): boolean => {
      return gameProgress.completedTrophies.includes(trophyId);
    },
    [gameProgress.completedTrophies]
  );

  const toggleTrophy = useCallback(
    (trophyId: string): void => {
      setState((prev) => {
        const current = prev[gameSlug] || {
          completedTasks: [],
          completedTrophies: [],
        };
        const isComplete = current.completedTrophies.includes(trophyId);

        const newProgress: GameProgress = {
          ...current,
          completedTrophies: isComplete
            ? current.completedTrophies.filter((id) => id !== trophyId)
            : [...current.completedTrophies, trophyId],
        };

        const newState = {
          ...prev,
          [gameSlug]: newProgress,
        };

        saveState(newState);
        return newState;
      });
    },
    [gameSlug]
  );

  // Progress calculation
  const getChecklistProgress = useCallback(
    (totalTasks: number): { completed: number; total: number } => {
      return {
        completed: gameProgress.completedTasks.length,
        total: totalTasks,
      };
    },
    [gameProgress.completedTasks.length]
  );

  const getTrophyProgress = useCallback(
    (totalTrophies: number): { completed: number; total: number } => {
      return {
        completed: gameProgress.completedTrophies.length,
        total: totalTrophies,
      };
    },
    [gameProgress.completedTrophies.length]
  );

  // Reset progress for current game
  const resetProgress = useCallback((): void => {
    setState((prev) => {
      const newState = {
        ...prev,
        [gameSlug]: {
          completedTasks: [],
          completedTrophies: [],
        },
      };

      saveState(newState);
      return newState;
    });
  }, [gameSlug]);

  // Get completed counts for display
  const completedTasksCount = gameProgress.completedTasks.length;
  const completedTrophiesCount = gameProgress.completedTrophies.length;

  return {
    isLoaded,
    isTaskComplete,
    toggleTask,
    isTrophyComplete,
    toggleTrophy,
    getChecklistProgress,
    getTrophyProgress,
    resetProgress,
    completedTasksCount,
    completedTrophiesCount,
  };
}

// Hook to get progress for multiple games (for home page)
export function useAllGamesProgress() {
  const [state, setState] = useState<ProgressState>(() => getInitialState());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(getInitialState());
    setIsLoaded(true);
  }, []);

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
}
