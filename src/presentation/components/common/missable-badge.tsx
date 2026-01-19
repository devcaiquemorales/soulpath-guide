import { Badge } from "../ui/badge";

export const MissableBadge = () => {
  return (
    <Badge
      variant="outline"
      className="text-[10px] px-1.5 py-0 h-4 font-medium border-destructive/50 text-destructive bg-destructive/5"
    >
      MISSABLE
    </Badge>
  );
};
