"use client";

import { useState } from "react";
import type { Trophy } from "@/domain/entities";
import { useTrophyProgress } from "@/application/hooks";
import {
  TROPHY_TYPE_ORDER,
  groupTrophiesByType,
  findPlatinumTrophy,
  getAllTrophyIds,
} from "@/application/services";
import { TrophySection } from "./trophy-section";
import { TrophySubItemsDialog } from "./trophy-sub-items-dialog";
import { PlatinumDialog } from "./platinum-dialog";

type TrophyTabProps = {
  gameSlug: string;
  trophies: Trophy[];
};

export const TrophyTab = ({ gameSlug, trophies }: TrophyTabProps) => {
  const [showPlatinumDialog, setShowPlatinumDialog] = useState(false);
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);

  const {
    isLoaded,
    isTrophyComplete,
    toggleTrophy,
    toggleAllTrophies,
    savePlatinumBackupForGame,
    restorePlatinumBackupForGame,
    isSubItemComplete,
    toggleSubItem,
    getSubItemProgress,
    getTrophyProgress,
  } = useTrophyProgress(gameSlug);

  const groupedTrophies = groupTrophiesByType(trophies);
  const platinumTrophy = findPlatinumTrophy(trophies);
  const trophyProgress = getTrophyProgress(trophies.length);

  // Handle platinum trophy toggle
  const handlePlatinumToggle = () => {
    if (!platinumTrophy) return;

    const isPlatinumComplete = isTrophyComplete(platinumTrophy.id);

    if (isPlatinumComplete) {
      // Unchecking platinum - restore previous state
      restorePlatinumBackupForGame();
    } else {
      // Checking platinum - show dialog
      setShowPlatinumDialog(true);
    }
  };

  const handleConfirmPlatinum = () => {
    if (!platinumTrophy) return;

    // Save current state as backup
    savePlatinumBackupForGame();

    // Get all trophy IDs
    const allTrophyIds = getAllTrophyIds(trophies);

    // Toggle all trophies on
    toggleAllTrophies(allTrophyIds, true);

    setShowPlatinumDialog(false);
  };

  const handleTrophyToggle = (trophy: Trophy) => {
    if (trophy.type === "platinum") {
      handlePlatinumToggle();
    } else {
      toggleTrophy(trophy.id);
    }
  };

  if (!isLoaded) {
    return (
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-muted/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {TROPHY_TYPE_ORDER.map((type, typeIndex) => (
          <TrophySection
            key={type}
            type={type}
            trophies={groupedTrophies[type]}
            isTrophyComplete={isTrophyComplete}
            onToggleTrophy={handleTrophyToggle}
            getSubItemProgress={getSubItemProgress}
            onOpenSubItems={setSelectedTrophy}
            showSeparator={typeIndex > 0}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {trophyProgress.completed === trophyProgress.total &&
          trophyProgress.total > 0
            ? "All trophies obtained! Congratulations!"
            : "Trophy progress is separate from checklist progress"}
        </p>
      </div>

      {/* Platinum Trophy Confirmation Dialog */}
      <PlatinumDialog
        open={showPlatinumDialog}
        onOpenChange={setShowPlatinumDialog}
        onConfirm={handleConfirmPlatinum}
      />

      {/* Trophy Sub-Items Dialog */}
      {selectedTrophy && (
        <TrophySubItemsDialog
          trophy={selectedTrophy}
          open={!!selectedTrophy}
          onOpenChange={(open) => !open && setSelectedTrophy(null)}
          isSubItemComplete={isSubItemComplete}
          onToggleSubItem={toggleSubItem}
          isTrophyComplete={isTrophyComplete(selectedTrophy.id)}
          onToggleTrophy={() => toggleTrophy(selectedTrophy.id)}
        />
      )}
    </div>
  );
};
