/**
 * Mapping of game slugs to their icon image paths
 */
export const GAME_IMAGES: Record<string, string> = {
  "demons-souls": "/games-icon/demon-souls-remake.png",
  "dark-souls": "/games-icon/dark-souls-remastered.png",
  "dark-souls-2": "/games-icon/dark-souls-2.png",
  "dark-souls-3": "/games-icon/dark-souls-3.png",
  "elden-ring": "/games-icon/elden-ring.png",
};

/**
 * Get the image path for a game by its slug
 */
export const getGameImage = (slug: string): string | undefined => {
  return GAME_IMAGES[slug];
};
