"use client";

import Link from "next/link";
import type { Game } from "@/data/types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { hasGameData } from "@/data/games";

type GameCardProps = {
  game: Game;
  completedTasks: number;
  totalTasks: number;
};

export function GameCard({ game, completedTasks, totalTasks }: GameCardProps) {
  const hasData = hasGameData(game.slug);
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const isComplete = completedTasks === totalTasks && totalTasks > 0;

  return (
    <Link
      href={hasData ? `/${game.slug}` : "#"}
      className={`group block ${!hasData ? "pointer-events-none" : ""}`}
    >
      <div
        className={`
          relative p-5 rounded-lg border border-border 
          bg-card transition-colors duration-150
          ${hasData ? "hover:border-primary/50 hover:bg-accent/50" : "opacity-50"}
        `}
      >
        {/* Game info */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-medium text-foreground truncate">
              {game.shortName}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
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
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-1.5" />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>
                {completedTasks} / {totalTasks} tasks
              </span>
              <span>{progressPercentage}%</span>
            </div>
          </div>
        )}

        {/* Hover indicator */}
        {hasData && (
          <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}
