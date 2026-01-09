import type { Game, GameData } from "../types";
import { demonsSoulsData } from "./demons-souls";

// All supported games
export const GAMES: Game[] = [
  {
    id: "demons-souls",
    slug: "demons-souls",
    name: "Demon's Souls",
    shortName: "Demon's Souls",
    releaseYear: 2020,
  },
  {
    id: "dark-souls",
    slug: "dark-souls",
    name: "Dark Souls: Remastered",
    shortName: "Dark Souls",
    releaseYear: 2018,
  },
  {
    id: "dark-souls-2",
    slug: "dark-souls-2",
    name: "Dark Souls II: Scholar of the First Sin",
    shortName: "Dark Souls II",
    releaseYear: 2015,
  },
  {
    id: "dark-souls-3",
    slug: "dark-souls-3",
    name: "Dark Souls III",
    shortName: "Dark Souls III",
    releaseYear: 2016,
  },
  {
    id: "elden-ring",
    slug: "elden-ring",
    name: "Elden Ring",
    shortName: "Elden Ring",
    releaseYear: 2022,
  },
];

// Game data registry - maps slug to full game data
const GAME_DATA_REGISTRY: Record<string, GameData> = {
  "demons-souls": demonsSoulsData,
};

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((game) => game.slug === slug);
}

export function getGameData(slug: string): GameData | undefined {
  return GAME_DATA_REGISTRY[slug];
}

export function hasGameData(slug: string): boolean {
  return slug in GAME_DATA_REGISTRY;
}
