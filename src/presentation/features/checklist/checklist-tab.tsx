"use client";

import type { ChecklistStep as ChecklistStepType } from "@/domain/entities";
import { useTaskProgress } from "@/application/hooks";
import { findFirstIncompleteStepIndex } from "@/application/services";
import { ChecklistStep } from "./checklist-step";

type ChecklistTabProps = {
  gameSlug: string;
  checklist: ChecklistStepType[];
};

export const ChecklistTab = ({ gameSlug, checklist }: ChecklistTabProps) => {
  const { isLoaded, isTaskComplete, toggleTask, getChecklistProgress } =
    useTaskProgress(gameSlug);

  const totalTasks = checklist.reduce(
    (total, step) => total + step.tasks.length,
    0
  );
  const checklistProgress = getChecklistProgress(totalTasks);

  // Find the first step with incomplete tasks to auto-expand
  const firstIncompleteStepIndex = findFirstIncompleteStepIndex(
    checklist,
    isTaskComplete
  );

  if (!isLoaded) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-12 bg-muted/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-1">
        {checklist.map((step, index) => (
          <ChecklistStep
            key={step.id}
            step={step}
            isTaskComplete={isTaskComplete}
            onToggleTask={toggleTask}
            defaultOpen={index === firstIncompleteStepIndex}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {checklistProgress.completed === checklistProgress.total &&
          checklistProgress.total > 0
            ? "Checklist complete! Check your trophies."
            : "Progress saves automatically"}
        </p>
      </div>
    </div>
  );
};
