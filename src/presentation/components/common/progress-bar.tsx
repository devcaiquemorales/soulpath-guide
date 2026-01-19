"use client";

import { Progress } from "../ui/progress";
import type { ProgressInfo } from "@/domain/entities";

type ProgressBarProps = {
  progress: ProgressInfo;
  className?: string;
};

export const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  const percentage =
    progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <Progress value={percentage} className="h-1.5 flex-1" />
        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
          {progress.completed}/{progress.total}
        </span>
      </div>
    </div>
  );
};
