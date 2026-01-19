"use client";

import Image from "next/image";
import { ExternalLink, BookOpen } from "lucide-react";
import type { Trophy, TrophySubItem } from "@/domain/entities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Progress } from "@/presentation/components/ui/progress";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { MissableBadge } from "@/presentation/components/common/missable-badge";
import { cn } from "@/lib/utils";

type SubItemRowProps = {
  subItem: TrophySubItem;
  isComplete: boolean;
  onToggle: () => void;
};

const SubItemRow = ({ subItem, isComplete, onToggle }: SubItemRowProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3 px-3 -mx-3 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer",
        isComplete && "opacity-60"
      )}
      onClick={onToggle}
    >
      <Checkbox
        checked={isComplete}
        onCheckedChange={() => {}}
        className="mt-1 shrink-0 pointer-events-none"
      />

      {/* Image thumbnail */}
      {subItem.image ? (
        <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 bg-muted">
          <Image
            src={subItem.image}
            alt={subItem.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded bg-muted shrink-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">?</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm font-medium",
            isComplete && "line-through text-muted-foreground"
          )}
        >
          {subItem.name}
        </div>
        <p
          className={cn(
            "text-xs text-muted-foreground mt-0.5 line-clamp-2",
            isComplete && "opacity-50"
          )}
        >
          {subItem.description}
        </p>
      </div>

      {/* Links */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Wiki link */}
        {subItem.wikiUrl && (
          <a
            href={subItem.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            title="View wiki page"
          >
            <BookOpen className="w-4 h-4" />
          </a>
        )}
        
        {/* YouTube link */}
        {subItem.youtubeUrl && (
          <a
            href={subItem.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            title="Watch video guide"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

type TrophySubItemsDialogProps = {
  trophy: Trophy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubItemComplete: (subItemId: string) => boolean;
  onToggleSubItem: (subItemId: string) => void;
  isTrophyComplete: boolean;
  onToggleTrophy: () => void;
};

export const TrophySubItemsDialog = ({
  trophy,
  open,
  onOpenChange,
  isSubItemComplete,
  onToggleSubItem,
  isTrophyComplete,
  onToggleTrophy,
}: TrophySubItemsDialogProps) => {
  const subItems = trophy.subItems || [];

  // Calculate progress
  const completedCount = subItems.filter((item) =>
    isSubItemComplete(item.id)
  ).length;
  const totalCount = subItems.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allComplete = completedCount === totalCount && totalCount > 0;

  // Group items by category
  const groupedItems = subItems.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof subItems>);

  const hasCategories = Object.keys(groupedItems).length > 1 || 
    (Object.keys(groupedItems).length === 1 && !groupedItems["Uncategorized"]);

  // Auto-complete trophy when all sub-items are complete
  const handleToggleSubItem = (subItemId: string) => {
    onToggleSubItem(subItemId);

    // Check if this toggle will complete all items
    const willBeComplete = isSubItemComplete(subItemId);
    const newCompletedCount = willBeComplete
      ? completedCount - 1
      : completedCount + 1;

    if (newCompletedCount === totalCount && !isTrophyComplete) {
      // All items will be complete, auto-check trophy
      onToggleTrophy();
    } else if (newCompletedCount < totalCount && isTrophyComplete) {
      // Not all items complete anymore, uncheck trophy
      onToggleTrophy();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 flex-wrap">
            <span>{trophy.name}</span>
            {trophy.isMissable && <MissableBadge />}
          </DialogTitle>
          <DialogDescription>{trophy.description}</DialogDescription>
        </DialogHeader>

        {/* Progress section */}
        <div className="space-y-2 py-2 border-y border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span
              className={cn(
                "tabular-nums",
                allComplete ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {completedCount}/{totalCount}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Sub-items list */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {hasCategories ? (
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <div className="mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary/90 mb-1.5">
                      {category}
                    </h3>
                    <div className="h-px bg-linear-to-r from-primary/40 via-primary/20 to-transparent" />
                  </div>
                  <div className="space-y-0">
                    {items.map((subItem) => (
                      <SubItemRow
                        key={subItem.id}
                        subItem={subItem}
                        isComplete={isSubItemComplete(subItem.id)}
                        onToggle={() => handleToggleSubItem(subItem.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              {subItems.map((subItem) => (
                <SubItemRow
                  key={subItem.id}
                  subItem={subItem}
                  isComplete={isSubItemComplete(subItem.id)}
                  onToggle={() => handleToggleSubItem(subItem.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tip section */}
        {trophy.tip && (
          <div className="pt-3 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-1">
                Achievement Guide Notes
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {trophy.tip}
              </p>
            </div>
          </div>
        )}

        {/* Footer with completion status */}
        {allComplete && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-primary text-center font-medium">
              All items collected!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
