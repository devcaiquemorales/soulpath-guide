export type TrophyType = "platinum" | "gold" | "silver" | "bronze";

export type TrophySubItem = {
  id: string;
  name: string;
  image?: string;
  description: string;
  youtubeUrl?: string;
  wikiUrl?: string;
  category?: string;
};

export type Trophy = {
  id: string;
  name: string;
  description: string;
  type: TrophyType;
  isMissable?: boolean;
  subItems?: TrophySubItem[];
  tip?: string;
};
