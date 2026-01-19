"use client";

import type { Task } from "@/domain/entities";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { MissableBadge } from "@/presentation/components/common/missable-badge";
import { cn } from "@/lib/utils";

type TaskItemProps = {
  task: Task;
  isComplete: boolean;
  onToggle: () => void;
};

export const TaskItem = ({ task, isComplete, onToggle }: TaskItemProps) => {
  return (
    <div
      className="group py-2 px-3 -mx-3 rounded hover:bg-accent/30 transition-colors cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={task.id}
          checked={isComplete}
          onCheckedChange={() => {}}
          className="mt-0.5 shrink-0 pointer-events-none"
        />

        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "text-sm block",
              isComplete && "text-muted-foreground line-through"
            )}
          >
            <span className="inline-flex items-center gap-2 flex-wrap">
              <span>{task.text}</span>
              {task.isMissable && <MissableBadge />}
            </span>
          </div>

          {task.note && (
            <p
              className={cn(
                "text-xs text-muted-foreground mt-1 leading-relaxed",
                isComplete && "opacity-50"
              )}
            >
              {task.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
