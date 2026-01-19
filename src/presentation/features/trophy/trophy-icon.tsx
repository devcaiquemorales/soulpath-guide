import type { TrophyType } from "@/domain/entities";
import { cn } from "@/lib/utils";

const trophyColors: Record<TrophyType, string> = {
  platinum: "text-blue-300",
  gold: "text-primary",
  silver: "text-zinc-400",
  bronze: "text-amber-700",
};

const trophyBgColors: Record<TrophyType, string> = {
  platinum: "bg-blue-500/10",
  gold: "bg-primary/10",
  silver: "bg-zinc-500/10",
  bronze: "bg-amber-700/10",
};

type TrophyIconProps = {
  type: TrophyType;
};

export const TrophyIcon = ({ type }: TrophyIconProps) => {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        trophyBgColors[type]
      )}
    >
      <svg
        className={cn("w-4 h-4", trophyColors[type])}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    </div>
  );
};
