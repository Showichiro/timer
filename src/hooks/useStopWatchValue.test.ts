import { renderHook } from "../test/test-utils";
import { useStopWatchValue } from "./useStopWatchValue";

describe("useStopWatchValue", () => {
  describe("return value", () => {
    it("returns hours", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.hours,
      ).toEqual(0);
    });

    it("returns minutes", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.minutes,
      ).toEqual(0);
    });

    it("returns seconds", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.seconds,
      ).toEqual(0);
    });

    it("returns isRunning", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.isRunning,
      ).toEqual(false);
    });

    it("returns isStarted", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.isStarted,
      ).toEqual(false);
    });

    it("returns isResume", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.isResume,
      ).toEqual(false);
    });

    it("returns handleClickStart", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.handleClickStart,
      ).toBeInstanceOf(Function);
    });

    it("returns handleClickPause", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.handleClickPause,
      ).toBeInstanceOf(Function);
    });

    it("returns handleClickResume", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.handleClickResume,
      ).toBeInstanceOf(Function);
    });

    it("returns handleClickReset", () => {
      expect(
        renderHook(() => useStopWatchValue({ playClickSound: vi.fn() })).result
          .current.handleClickReset,
      ).toBeInstanceOf(Function);
    });
  });
});
