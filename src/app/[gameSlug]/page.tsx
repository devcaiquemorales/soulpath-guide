"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/presentation/components/common/page-header";
import { ProgressBar } from "@/presentation/components/common/progress-bar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/presentation/components/ui/tabs";
import { ChecklistTab } from "@/presentation/features/checklist";
import { TrophyTab } from "@/presentation/features/trophy";
import { useTaskProgress, useTrophyProgress } from "@/application/hooks";
import { getGameData, calculateTotalTasks } from "@/application/services";
import { getGameImage } from "@/lib/constants/game-images";

type PageProps = {
  params: Promise<{ gameSlug: string }>;
};

type TabType = "checklist" | "trophies";

export default function GameChecklistPage({ params }: PageProps) {
  const { gameSlug } = use(params);
  const gameData = getGameData(gameSlug);
  const [activeTab, setActiveTab] = useState<TabType>("checklist");

  if (!gameData) {
    notFound();
  }

  const { getChecklistProgress } = useTaskProgress(gameSlug);
  const { getTrophyProgress } = useTrophyProgress(gameSlug);

  const totalTasks = calculateTotalTasks(gameData.checklist);
  const checklistProgress = getChecklistProgress(totalTasks);
  const trophyProgress = getTrophyProgress(gameData.trophies.length);

  // Determine which progress to show based on active tab
  const currentProgress =
    activeTab === "checklist" ? checklistProgress : trophyProgress;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={gameData.game.shortName}
        backHref="/"
        backLabel="Games"
        gameImage={getGameImage(gameSlug)}
      />

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabType)}
      >
        {/* Tabs */}
        <div className="sticky top-[57px] z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-3">
            <TabsList className="w-full justify-center p-0.5 gap-0">
              <TabsTrigger value="checklist" className="flex-1 h-full">
                Checklist
              </TabsTrigger>
              <TabsTrigger value="trophies" className="flex-1 h-full">
                Trophies
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Progress bar */}
        <div className="sticky top-[105px] z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-2">
            <ProgressBar progress={currentProgress} />
          </div>
        </div>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <TabsContent value="checklist" className="mt-0 w-full md:w-4xl max-w-4xl">
            <ChecklistTab
              gameSlug={gameSlug}
              checklist={gameData.checklist}
            />
          </TabsContent>

          <TabsContent value="trophies" className="mt-0 w-full md:w-4xl max-w-4xl">
            <TrophyTab
              gameSlug={gameSlug}
              trophies={gameData.trophies}
            />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
