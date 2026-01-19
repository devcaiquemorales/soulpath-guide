"use client";

import { ChevronRight } from "lucide-react";
import type { Trophy, ProgressInfo } from "@/domain/entities";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { MissableBadge } from "@/presentation/components/common/missable-badge";
import { TrophyIcon } from "./trophy-icon";
import { cn } from "@/lib/utils";

type TrophyItemProps = {
  trophy: Trophy;
  isComplete: boolean;
  onToggle: () => void;
  subItemProgress?: ProgressInfo;
  onOpenSubItems?: () => void;
};

export const TrophyItem = ({
  trophy,
  isComplete,
  onToggle,
  subItemProgress,
  onOpenSubItems,
}: TrophyItemProps) => {
  const hasSubItems = trophy.subItems && trophy.subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems && onOpenSubItems) {
      onOpenSubItems();
    } else {
      onToggle();
    }
  };

  return (
    <div
      className="group flex items-start gap-3 py-3 px-3 -mx-3 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <Checkbox
        id={trophy.id}
        checked={isComplete}
        onCheckedChange={() => {}}
        onClick={(e) => {
          // Allow direct checkbox click for trophies with sub-items
          if (hasSubItems) {
            e.stopPropagation();
            onToggle();
          }
        }}
        className={cn(
          "mt-2 shrink-0",
          !hasSubItems && "pointer-events-none"
        )}
      />

      <TrophyIcon type={trophy.type} />

      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm font-medium block",
            isComplete && "text-muted-foreground line-through"
          )}
        >
          <span className="inline-flex items-center gap-2 flex-wrap">
            <span>{trophy.name}</span>
            {trophy.isMissable && <MissableBadge />}
          </span>
        </div>

        <p
          className={cn(
            "text-xs text-muted-foreground mt-0.5",
            isComplete && "opacity-50"
          )}
        >
          {trophy.description}
        </p>
      </div>

      {/* Sub-item progress and chevron */}
      {hasSubItems && subItemProgress && (
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "text-xs tabular-nums",
              subItemProgress.completed === subItemProgress.total
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            {subItemProgress.completed}/{subItemProgress.total}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};
