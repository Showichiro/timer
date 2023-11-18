/**
 * The function checks if the localStorage is available in the current environment.
 * @returns The function isLocalStorageAvailable returns a boolean value. It returns true if the
 * localStorage object is available and can be used, and false if it is not available or cannot be
 * used.
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = "test";
    localStorage.setItem(test, "test");
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};
