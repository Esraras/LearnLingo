const FAVORITE_STORAGE_PREFIX = "learnLingo_favoriteTeachers_";

const getFavoriteStorageKey = (uid) => `${FAVORITE_STORAGE_PREFIX}${uid}`;

export const loadFavoriteIds = (uid) => {
  if (!uid || typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(getFavoriteStorageKey(uid));
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
};

export const saveFavoriteIds = (uid, ids) => {
  if (!uid || typeof window === "undefined") return;

  try {
    window.localStorage.setItem(getFavoriteStorageKey(uid), JSON.stringify(ids));
  } catch {
    // Ignore local storage errors.
  }
};
