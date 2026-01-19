"use client";

import type { Trophy, TrophyType, ProgressInfo } from "@/domain/entities";
import { TROPHY_TYPE_LABELS } from "@/application/services";
import { Separator } from "@/presentation/components/ui/separator";
import { TrophyItem } from "./trophy-item";

type TrophySectionProps = {
  type: TrophyType;
  trophies: Trophy[];
  isTrophyComplete: (trophyId: string) => boolean;
  onToggleTrophy: (trophy: Trophy) => void;
  getSubItemProgress: (subItemIds: string[]) => ProgressInfo;
  onOpenSubItems: (trophy: Trophy) => void;
  showSeparator?: boolean;
};

export const TrophySection = ({
  type,
  trophies,
  isTrophyComplete,
  onToggleTrophy,
  getSubItemProgress,
  onOpenSubItems,
  showSeparator = false,
}: TrophySectionProps) => {
  if (trophies.length === 0) return null;

  return (
    <section>
      {showSeparator && <Separator className="mb-6" />}

      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        {TROPHY_TYPE_LABELS[type]} ({trophies.length})
      </h2>

      <div className="space-y-0">
        {trophies.map((trophy) => {
          const subItemIds = trophy.subItems?.map((s) => s.id) || [];
          const subItemProgress =
            subItemIds.length > 0 ? getSubItemProgress(subItemIds) : undefined;

          return (
            <TrophyItem
              key={trophy.id}
              trophy={trophy}
              isComplete={isTrophyComplete(trophy.id)}
              onToggle={() => onToggleTrophy(trophy)}
              subItemProgress={subItemProgress}
              onOpenSubItems={() => onOpenSubItems(trophy)}
            />
          );
        })}
      </div>
    </section>
  );
};
