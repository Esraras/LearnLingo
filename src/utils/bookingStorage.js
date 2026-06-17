const BOOKING_STORAGE_PREFIX = "learnLingo_bookedTeachers_";

const getBookingStorageKey = (uid) => `${BOOKING_STORAGE_PREFIX}${uid || "guest"}`;

export const loadBookingIds = (uid) => {
  if (typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(getBookingStorageKey(uid));
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
};

export const saveBookingIds = (uid, ids) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(getBookingStorageKey(uid), JSON.stringify(ids));
  } catch {
    // Ignore local storage errors.
  }
};
