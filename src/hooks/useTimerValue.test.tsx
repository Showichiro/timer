import { atom, createStore, Provider } from "jotai";
import type { ReactNode } from "react";
import { act, renderHook } from "../test/test-utils";
import type { Timer } from "./useTimerList";
import useTimerValue from "./useTimerValue";

describe("countdown lifecycle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const setup = () => {
    const timerAtom = atom<Timer>({
      title: "tea",
      type: "countdown",
      timerValue: { hours: 0, minutes: 0, seconds: 3 },
    });
    const store = createStore();
    const click = vi.fn();
    const expire = vi.fn();
    const hook = renderHook(
      () =>
        useTimerValue({
          timerAtom,
          playClickSound: click,
          playTimeUpSound: expire,
        }),
      {
        wrapper: ({ children }: { children: ReactNode }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );
    return { ...hook, timerAtom, store, click, expire };
  };

  it("starts, pauses, resumes, expires once, and resets without autoplay", () => {
    const { result, expire, click } = setup();
    act(() => result.current.timerValue.handleClickStart());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.timerValue.currentValue.seconds).toBe(2);
    act(() => result.current.timerValue.handleClickPause());
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.timerValue.currentValue.seconds).toBe(2);
    expect(result.current.timerValue.isResume).toBe(true);
    act(() => result.current.timerValue.handleClickResume());
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.timerValue.isExpired).toBe(true);
    expect(expire).toHaveBeenCalledOnce();
    act(() => result.current.timerValue.handleClickReset());
    expect(result.current.timerValue.currentValue.seconds).toBe(3);
    expect(result.current.timerValue.isRunning).toBe(false);
    expect(click).toHaveBeenCalledTimes(4);
  });

  it("cancels edits without changing stored duration and confirms a new paused duration", () => {
    const { result, store, timerAtom } = setup();
    act(() => result.current.timerValue.handleClickCount());
    expect(result.current.timerValue.isEditing).toBe(true);
    act(() => result.current.timerValue.handleClickEditCancel());
    expect(store.get(timerAtom).timerValue?.seconds).toBe(3);
    act(() => result.current.timerValue.handleClickCount());
    act(() =>
      result.current.timerValue.handleClickEditConfirm({
        hours: 0,
        minutes: 2,
        seconds: 10,
      }),
    );
    expect(store.get(timerAtom).timerValue).toEqual({
      hours: 0,
      minutes: 2,
      seconds: 10,
    });
    expect(result.current.timerValue.currentValue).toEqual({
      hours: 0,
      minutes: 2,
      seconds: 10,
    });
    expect(result.current.timerValue.isEditing).toBe(false);
    expect(result.current.timerValue.isRunning).toBe(false);
  });
});
