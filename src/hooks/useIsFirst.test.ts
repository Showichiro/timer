import { renderHook } from "../test/test-utils";
import { useIsFirst } from "./useIsFirst";

describe("useIsFirst", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const { isLocalStorageAvailable } = vi.hoisted(() => ({
    isLocalStorageAvailable: vi.fn(() => true),
  }));

  vi.mock("../utils/localStorageUtil", () => {
    return {
      isLocalStorageAvailable,
    };
  });

  it("should return true when localStorage is not available", () => {
    isLocalStorageAvailable.mockReturnValue(false);
    expect(renderHook(() => useIsFirst()).result.current).toBe(true);
  });

  it("should return true when localStorage is available and localStorage value (isFirst) is null", () => {
    isLocalStorageAvailable.mockReturnValue(true);
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    expect(renderHook(() => useIsFirst()).result.current).toBe(true);
    expect(setItemSpy).toHaveBeenCalledWith("isFirst", "false");
  });

  it("should return false when localStorage is available and localStorage value (isFirst) is 'false'", () => {
    isLocalStorageAvailable.mockReturnValue(true);
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("false");
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    expect(renderHook(() => useIsFirst()).result.current).toBe(false);
    expect(setItemSpy).toHaveBeenCalledWith("isFirst", "false");
  });
});
