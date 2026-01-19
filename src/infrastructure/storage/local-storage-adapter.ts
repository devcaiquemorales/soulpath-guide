export type StorageAdapter<T> = {
  get: () => T | null;
  set: (value: T) => void;
  remove: () => void;
};

/**
 * Creates a typed localStorage adapter for a specific key
 * Handles SSR by checking for window availability
 */
export const createLocalStorageAdapter = <T>(key: string): StorageAdapter<T> => {
  const isClient = typeof window !== "undefined";

  return {
    get: (): T | null => {
      if (!isClient) return null;

      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored) as T;
        }
      } catch (e) {
        console.error(`Failed to load ${key} from localStorage:`, e);
      }

      return null;
    },

    set: (value: T): void => {
      if (!isClient) return;

      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`Failed to save ${key} to localStorage:`, e);
      }
    },

    remove: (): void => {
      if (!isClient) return;

      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(`Failed to remove ${key} from localStorage:`, e);
      }
    },
  };
};
