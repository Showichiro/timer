export const isLocalStorageAvailable = () => {
  try {
    const test = "test";
    localStorage.setItem(test, "test");
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};
