"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ChecklistStep as ChecklistStepType } from "@/data/types";
import { TaskItem } from "@/components/task-item";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ChecklistStepProps = {
  step: ChecklistStepType;
  isTaskComplete: (taskId: string) => boolean;
  onToggleTask: (taskId: string) => void;
  defaultOpen?: boolean;
};

export function ChecklistStep({
  step,
  isTaskComplete,
  onToggleTask,
  defaultOpen = false,
}: ChecklistStepProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const completedCount = step.tasks.filter((task) =>
    isTaskComplete(task.id)
  ).length;
  const totalCount = step.tasks.length;
  const isStepComplete = completedCount === totalCount;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
          "hover:bg-accent/50",
          isStepComplete && "opacity-70"
        )}
      >
        {/* Location code badge */}
        {step.locationCode && (
          <Badge
            variant="secondary"
            className={cn(
              "shrink-0 font-mono text-[10px] px-1.5",
              isStepComplete && "opacity-50"
            )}
          >
            {step.locationCode}
          </Badge>
        )}

        {/* Title and badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "font-medium text-sm",
                isStepComplete && "text-muted-foreground"
              )}
            >
              {step.title}
            </span>

            {step.isRevisit && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 font-normal text-muted-foreground"
              >
                Returning
              </Badge>
            )}
          </div>
        </div>

        {/* Completion count */}
        <span
          className={cn(
            "text-xs tabular-nums shrink-0",
            isStepComplete ? "text-primary" : "text-muted-foreground"
          )}
        >
          {completedCount}/{totalCount}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="overflow-hidden"
      >
        <div className="pb-2 pt-1 pl-3 border-l-2 border-border ml-4 space-y-0">
          {step.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isComplete={isTaskComplete(task.id)}
              onToggle={() => onToggleTask(task.id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
