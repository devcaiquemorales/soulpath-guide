"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { TrophyItem } from "@/components/trophy-item";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getGameData } from "@/data/games";
import { useProgress } from "@/hooks/use-progress";
import type { Trophy, TrophyType } from "@/data/types";

type PageProps = {
  params: Promise<{ gameSlug: string }>;
};

const trophyTypeOrder: TrophyType[] = ["platinum", "gold", "silver", "bronze"];

const trophyTypeLabels: Record<TrophyType, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

function groupTrophiesByType(trophies: Trophy[]): Record<TrophyType, Trophy[]> {
  const groups: Record<TrophyType, Trophy[]> = {
    platinum: [],
    gold: [],
    silver: [],
    bronze: [],
  };

  for (const trophy of trophies) {
    groups[trophy.type].push(trophy);
  }

  return groups;
}

export default function TrophiesPage({ params }: PageProps) {
  const { gameSlug } = use(params);
  const gameData = getGameData(gameSlug);

  if (!gameData) {
    notFound();
  }

  const { isLoaded, isTrophyComplete, toggleTrophy, getTrophyProgress } =
    useProgress(gameSlug);

  const totalTrophies = gameData.trophies.length;
  const progress = getTrophyProgress(totalTrophies);
  const progressPercentage =
    totalTrophies > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  const groupedTrophies = groupTrophiesByType(gameData.trophies);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={`${gameData.game.shortName} - Trophies`}
        backHref={`/${gameSlug}`}
        backLabel="Checklist"
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

      {/* Trophy list */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
        {!isLoaded ? (
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-muted/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {trophyTypeOrder.map((type, typeIndex) => {
              const trophies = groupedTrophies[type];
              if (trophies.length === 0) return null;

              return (
                <section key={type}>
                  {typeIndex > 0 && <Separator className="mb-6" />}

                  <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    {trophyTypeLabels[type]} ({trophies.length})
                  </h2>

                  <div className="space-y-0">
                    {trophies.map((trophy) => (
                      <TrophyItem
                        key={trophy.id}
                        trophy={trophy}
                        isComplete={isTrophyComplete(trophy.id)}
                        onToggle={() => toggleTrophy(trophy.id)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {progress.completed === progress.total && progress.total > 0
              ? "All trophies obtained! Congratulations!"
              : "Trophy progress is separate from checklist progress"}
          </p>
        </div>
      </main>
    </div>
  );
}
