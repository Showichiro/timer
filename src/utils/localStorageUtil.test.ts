import { isLocalStorageAvailable } from "./localStorageUtil";

describe("isLocalStorageAvailable", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should return true when localstorage is available", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    expect(isLocalStorageAvailable()).toBe(true);
  });

  it("should return false when localstorage is not available", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Error");
    });
    expect(isLocalStorageAvailable()).toBe(false);
  });
});
