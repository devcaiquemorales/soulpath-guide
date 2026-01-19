"use client";

import Link from "next/link";
import Image from "next/image";
import { Trophy } from "lucide-react";
import type { Game } from "@/domain/entities";
import { Progress } from "@/presentation/components/ui/progress";
import { Badge } from "@/presentation/components/ui/badge";
import { hasGameData } from "@/application/services";
import { getGameImage } from "@/lib/constants/game-images";

type GameCardProps = {
  game: Game;
  completedTasks: number;
  totalTasks: number;
  completedTrophies: number;
  totalTrophies: number;
};

export const GameCard = ({
  game,
  completedTasks,
  totalTasks,
  completedTrophies,
  totalTrophies,
}: GameCardProps) => {
  const hasData = hasGameData(game.slug);
  const tasksProgressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const trophiesProgressPercentage =
    totalTrophies > 0
      ? Math.round((completedTrophies / totalTrophies) * 100)
      : 0;
  const isComplete =
    completedTasks === totalTasks &&
    totalTasks > 0 &&
    completedTrophies === totalTrophies &&
    totalTrophies > 0;
  const imageUrl = getGameImage(game.slug);

  return (
    <Link
      href={hasData ? `/${game.slug}` : "#"}
      className={`group block ${!hasData ? "pointer-events-none" : ""}`}
    >
      <div
        className={`
          relative overflow-hidden rounded-lg border border-border 
          bg-card transition-all duration-200
          ${hasData ? "hover:border-primary/50 hover:shadow-lg" : "opacity-50"}
        `}
      >
        {/* Game image */}
        {imageUrl && (
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 448px"
              priority={game.slug === "demons-souls"}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent" />
          </div>
        )}

        {/* Game info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              <h2 className="font-medium text-foreground truncate">
                {game.shortName}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {game.releaseYear}
              </p>
            </div>

            {!hasData && (
              <Badge variant="secondary" className="text-xs shrink-0">
                Coming Soon
              </Badge>
            )}

            {isComplete && hasData && (
              <Badge
                variant="outline"
                className="text-xs shrink-0 border-primary/50 text-primary"
              >
                Complete
              </Badge>
            )}
          </div>

          {/* Progress section */}
          {hasData && (
            <div className="space-y-3">
              {/* Tasks progress */}
              <div className="space-y-1.5">
                <Progress value={tasksProgressPercentage} className="h-1.5" />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    {completedTasks} / {totalTasks} tasks
                  </span>
                  <span>{tasksProgressPercentage}%</span>
                </div>
              </div>

              {/* Trophies progress */}
              <div className="space-y-1.5">
                <Progress
                  value={trophiesProgressPercentage}
                  className="h-1.5"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {completedTrophies} / {totalTrophies} trophies
                  </span>
                  <span>{trophiesProgressPercentage}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
