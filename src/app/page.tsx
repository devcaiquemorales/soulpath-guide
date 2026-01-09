"use client";

import { GameCard } from "@/components/game-card";
import { GAMES, getGameData } from "@/data/games";
import { useAllGamesProgress } from "@/hooks/use-progress";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function HomePage() {
  const { isLoaded, getGameProgress } = useAllGamesProgress();

  // Calculate total tasks for each game
  const getGameTotalTasks = (slug: string): number => {
    const gameData = getGameData(slug);
    if (!gameData) return 0;
    return gameData.checklist.reduce(
      (total, step) => total + step.tasks.length,
      0
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-foreground">
                Soulpath Guide
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Platinum trophy tracker for FromSoftware games
              </p>
            </div>
            <AnimatedThemeToggler />
          </div>
        </div>
      </header>

      {/* Game grid */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {GAMES.map((game) => {
            const progress = isLoaded
              ? getGameProgress(game.slug)
              : { completedTasks: 0, completedTrophies: 0 };
            const totalTasks = getGameTotalTasks(game.slug);

            return (
              <GameCard
                key={game.id}
                game={game}
                completedTasks={progress.completedTasks}
                totalTasks={totalTasks}
              />
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center mt-8 sm:mt-12">
          Progress is saved locally on your device
        </p>
      </div>
    </main>
  );
}
