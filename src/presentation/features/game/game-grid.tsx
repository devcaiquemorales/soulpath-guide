"use client";

import { useAllGamesProgress } from "@/application/hooks";
import { getAllGames, getGameData, calculateTotalTasks } from "@/application/services";
import { GameCard } from "./game-card";

export const GameGrid = () => {
  const { isLoaded, getGameProgress } = useAllGamesProgress();
  const games = getAllGames();

  // Calculate total tasks for each game
  const getGameTotalTasks = (slug: string): number => {
    const gameData = getGameData(slug);
    if (!gameData) return 0;
    return calculateTotalTasks(gameData.checklist);
  };

  // Calculate total trophies for each game
  const getGameTotalTrophies = (slug: string): number => {
    const gameData = getGameData(slug);
    if (!gameData) return 0;
    return gameData.trophies.length;
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
      {games.map((game) => {
        const progress = isLoaded
          ? getGameProgress(game.slug)
          : { completedTasks: 0, completedTrophies: 0 };
        const totalTasks = getGameTotalTasks(game.slug);
        const totalTrophies = getGameTotalTrophies(game.slug);

        return (
          <GameCard
            key={game.id}
            game={game}
            completedTasks={progress.completedTasks}
            totalTasks={totalTasks}
            completedTrophies={progress.completedTrophies}
            totalTrophies={totalTrophies}
          />
        );
      })}
    </div>
  );
};
