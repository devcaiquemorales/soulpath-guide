"use client";

import { AnimatedThemeToggler } from "@/presentation/components/ui/animated-theme-toggler";
import { GameGrid } from "@/presentation/features/game";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-foreground">
                Soulpath Guide
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Platinum trophy tracker for FromSoftware games
              </p>
            </div>
            <AnimatedThemeToggler />
          </div>
        </div>
      </header>

      {/* Game grid */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        <GameGrid />

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center mt-8 sm:mt-12">
          Progress is saved locally on your device
        </p>
      </div>
    </main>
  );
}
