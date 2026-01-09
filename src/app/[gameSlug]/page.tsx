"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { ChecklistStep } from "@/components/checklist-step";
import { Progress } from "@/components/ui/progress";
import { getGameData } from "@/data/games";
import { useProgress } from "@/hooks/use-progress";

type PageProps = {
  params: Promise<{ gameSlug: string }>;
};

export default function GameChecklistPage({ params }: PageProps) {
  const { gameSlug } = use(params);
  const gameData = getGameData(gameSlug);

  if (!gameData) {
    notFound();
  }

  const { isLoaded, isTaskComplete, toggleTask, getChecklistProgress } =
    useProgress(gameSlug);

  const totalTasks = gameData.checklist.reduce(
    (total, step) => total + step.tasks.length,
    0
  );
  const progress = getChecklistProgress(totalTasks);
  const progressPercentage =
    totalTasks > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  // Find the first step with incomplete tasks to auto-expand
  const firstIncompleteStepIndex = gameData.checklist.findIndex((step) =>
    step.tasks.some((task) => !isTaskComplete(task.id))
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={gameData.game.shortName}
        backHref="/"
        backLabel="Games"
        showTrophiesLink
        trophiesHref={`/${gameSlug}/trophies`}
      />

      {/* Progress bar */}
      <div className="sticky top-[57px] z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-2">
          <div className="flex items-center gap-3">
            <Progress value={progressPercentage} className="h-1.5 flex-1" />
            <span className="text-xs text-muted-foreground tabular-nums shrink-0">
              {progress.completed}/{progress.total}
            </span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
        {!isLoaded ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-muted/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {gameData.checklist.map((step, index) => (
              <ChecklistStep
                key={step.id}
                step={step}
                isTaskComplete={isTaskComplete}
                onToggleTask={toggleTask}
                defaultOpen={index === firstIncompleteStepIndex}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {progress.completed === progress.total && progress.total > 0
              ? "Checklist complete! Check your trophies."
              : "Progress saves automatically"}
          </p>
        </div>
      </main>
    </div>
  );
}
