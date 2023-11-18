import { isLocalStorageAvailable } from "./localStorageUtil";

describe("isLocalStorageAvailable", () => {
  const spy = vi.spyOn(Storage.prototype, "setItem");

  it("should return true when localstorage is available", () => {
    expect(isLocalStorageAvailable()).toBe(true);
  });

  it("should return false when localstorage is not available", () => {
    spy.mockImplementation(() => {
      throw new Error("Error");
    });
    expect(isLocalStorageAvailable()).toBe(false);
  });
});
