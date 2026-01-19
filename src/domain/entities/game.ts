export type Game = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  releaseYear: number;
};

export type GameData = {
  game: Game;
  checklist: import("./checklist").ChecklistStep[];
  trophies: import("./trophy").Trophy[];
};
