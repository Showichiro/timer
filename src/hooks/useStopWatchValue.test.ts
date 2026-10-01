import { act, renderHook } from "../test/test-utils";
import { useStopWatchValue } from "./useStopWatchValue";

describe("useStopWatchValue", () => {
  it("preserves elapsed time across pause/resume and resets to a stopped zero", () => {
    vi.useFakeTimers();
    try {
      const click = vi.fn();
      const { result } = renderHook(() =>
        useStopWatchValue({ playClickSound: click }),
      );
      act(() => result.current.handleClickStart());
      act(() => vi.advanceTimersByTime(2000));
      expect(result.current.seconds).toBe(2);
      act(() => result.current.handleClickPause());
      act(() => vi.advanceTimersByTime(3000));
      expect(result.current.seconds).toBe(2);
      expect(result.current.isResume).toBe(true);
      act(() => result.current.handleClickResume());
      act(() => vi.advanceTimersByTime(1000));
      expect(result.current.seconds).toBe(3);
      act(() => result.current.handleClickReset());
      expect(result.current.seconds).toBe(0);
      expect(result.current.isRunning).toBe(false);
      expect(click).toHaveBeenCalledTimes(4);
    } finally {
      vi.useRealTimers();
    }
  });
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
