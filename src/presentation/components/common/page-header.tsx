"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Trophy } from "lucide-react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

type PageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
  showTrophiesLink?: boolean;
  trophiesHref?: string;
  gameImage?: string;
};

export const PageHeader = ({
  title,
  backHref,
  backLabel = "Back",
  showTrophiesLink = false,
  trophiesHref,
  gameImage,
}: PageHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left side - Back button */}
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
          )}

          {/* Center - Title with optional game icon */}
          <div className="flex items-center gap-2 justify-center flex-1 min-w-0">
            {gameImage && (
              <div className="relative w-6 h-6 rounded overflow-hidden shrink-0 opacity-80">
                <Image
                  src={gameImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            )}
            <h1 className="font-medium text-sm text-foreground truncate">
              {title}
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {showTrophiesLink && trophiesHref && (
              <Link
                href={trophiesHref}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Trophies</span>
              </Link>
            )}

            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
};
