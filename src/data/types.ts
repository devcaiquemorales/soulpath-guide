export type TrophyType = "platinum" | "gold" | "silver" | "bronze";

export type Game = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  releaseYear: number;
};

// Individual checkbox task within a step
export type Task = {
  id: string;
  text: string;
  note?: string; // Inline tip/instruction (shown below task text)
  isMissable?: boolean; // Shows red "MISSABLE" badge
  isPointOfNoReturn?: boolean; // Shows warning icon
};

// A location-based step (e.g., "Gates of Boletaria (1-1)")
export type ChecklistStep = {
  id: string;
  order: number;
  locationCode?: string; // e.g., "1-1", "2-2", "NEXUS"
  title: string; // e.g., "Gates of Boletaria", "NEW GAME PLUS"
  isRevisit?: boolean; // True if "(Returning)" to this location
  tasks: Task[];
};

export type Trophy = {
  id: string;
  name: string;
  description: string;
  type: TrophyType;
  isMissable?: boolean;
};

export type GameData = {
  game: Game;
  checklist: ChecklistStep[]; // Flat linear order, includes NG+ as final steps
  trophies: Trophy[];
};
