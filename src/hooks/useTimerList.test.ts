import { TimerType, initializer, reducer, useTimerList } from "./useTimerList";
import { renderHook } from "../test/test-utils";

const { getTimerFromUrl } = vi.hoisted(() => {
  return {
    getTimerFromUrl: vi.fn(),
  };
});

vi.mock("../utils/urlUtil", () => {
  return {
    getTimerFromUrl,
  };
});

describe("userTimerList", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const state = [
    {
      id: "1",
      type: "stopwatch" as TimerType,
      timerValue: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      title: "timer",
    },
  ];

  describe("reducer", () => {
    it("should add new timer state when called with addNewTImer", () => {
      expect(
        reducer(state, {
          type: "addNewTimer",
          args: { id: "2", type: "countdown" },
        }),
      ).toEqual([
        {
          id: "1",
          type: "stopwatch" as TimerType,
          timerValue: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          title: "timer",
        },
        {
          id: "2",
          timerValue: undefined,
          title: undefined,
          type: "countdown",
        },
      ]);
    });

    it("should update timer state when called with updateTimer", () => {
      expect(
        reducer(state, {
          type: "updateTimer",
          args: {
            id: "1",
            title: "new title",
            timerValue: { hours: 0, minutes: 0, seconds: 0 },
            type: "stopwatch" as TimerType,
          },
        }),
      ).toEqual([
        {
          id: "1",
          type: "stopwatch" as TimerType,
          timerValue: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          title: "new title",
        },
      ]);
    });

    it("should remove timer state when called with removeTimer", () => {
      expect(
        reducer(state, {
          type: "removeTimer",
          args: { id: "1" },
        }),
      ).toEqual([]);
    });
  });

  describe("initializer", () => {
    it("should return initial value when localstorage does not have savedList", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      expect(initializer()).toEqual([
        {
          id: expect.any(String),
          timerValue: undefined,
          title: undefined,
          type: "countdown",
        },
      ]);
    });

    it("should return savedList when localstorage has savedList", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
        JSON.stringify([
          {
            id: "1",
            timerValue: {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            title: "timer1",
            type: "countdown",
          },
          {
            id: "2",
            timerValue: {
              hours: 1,
              minutes: 2,
              seconds: 3,
            },
            title: "timer2",
            type: "stopwatch",
          },
        ]),
      );
      expect(initializer()).toEqual([
        {
          id: "1",
          timerValue: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          title: "timer1",
          type: "countdown",
        },
        {
          id: "2",
          timerValue: {
            hours: 1,
            minutes: 2,
            seconds: 3,
          },
          title: "timer2",
          type: "stopwatch",
        },
      ]);
    });

    it("should return urlValue when getTimerFromUrl returns urlValue", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
        JSON.stringify([
          {
            id: "1",
            timerValue: {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            title: "timer1",
            type: "countdown",
          },
          {
            id: "2",
            timerValue: {
              hours: 1,
              minutes: 2,
              seconds: 3,
            },
            title: "timer2",
            type: "stopwatch",
          },
        ]),
      );
      getTimerFromUrl.mockReturnValue({
        hours: 5,
        minutes: 6,
        seconds: 7,
      });
      expect(initializer()).toEqual([
        {
          id: expect.any(String),
          timerValue: {
            hours: 5,
            minutes: 6,
            seconds: 7,
          },
          title: undefined,
          type: "countdown",
        },
        {
          id: "1",
          timerValue: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          title: "timer1",
          type: "countdown",
        },
        {
          id: "2",
          timerValue: {
            hours: 1,
            minutes: 2,
            seconds: 3,
          },
          title: "timer2",
          type: "stopwatch",
        },
      ]);
    });
  });

  describe("hooks", () => {
    it("returns timerList", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      expect(renderHook(() => useTimerList()).result.current.timerList).toEqual(
        [
          {
            id: expect.any(String),
            timerValue: undefined,
            title: undefined,
            type: "countdown",
          },
        ],
      );
    });

    it("returns addNewTimer", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      expect(
        renderHook(() => useTimerList()).result.current.addNewTimer,
      ).toBeInstanceOf(Function);
    });

    it("returns removeTimer", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      expect(
        renderHook(() => useTimerList()).result.current.removeTimer,
      ).toBeInstanceOf(Function);
    });

    it("returns updateTimer", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      expect(
        renderHook(() => useTimerList()).result.current.updateTimer,
      ).toBeInstanceOf(Function);
    });

    it("adds new timer when addNewTimer called", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      const hook = renderHook(() => useTimerList());
      expect(hook.result.current.timerList).toEqual([
        {
          id: expect.any(String),
          timerValue: undefined,
          title: undefined,
          type: "countdown",
        },
      ]);
      hook.result.current.addNewTimer("stopwatch");
      hook.rerender();
      expect(hook.result.current.timerList).toEqual([
        {
          id: expect.any(String),
          timerValue: undefined,
          title: undefined,
          type: "countdown",
        },
        {
          id: expect.any(String),
          timerValue: undefined,
          title: undefined,
          type: "stopwatch",
        },
      ]);
    });

    it("removes timer when removeTimer called", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      const hook = renderHook(() => useTimerList());
      expect(hook.result.current.timerList).toEqual([
        {
          id: expect.any(String),
          timerValue: undefined,
          title: undefined,
          type: "countdown",
        },
      ]);
      hook.result.current.removeTimer(hook.result.current.timerList[0].id);
      hook.rerender();
      expect(hook.result.current.timerList).toEqual([]);
    });

    it("updates timer when updateTimer called", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      getTimerFromUrl.mockReturnValue(null);
      const hook = renderHook(() => useTimerList());
      expect(hook.result.current.timerList).toEqual([
        {
          id: expect.any(String),
          timerValue: undefined,
          title: undefined,
          type: "countdown",
        },
      ]);
      hook.result.current.updateTimer({
        id: hook.result.current.timerList[0].id,
        title: "new title",
        timerValue: { hours: 0, minutes: 0, seconds: 0 },
        type: "stopwatch" as TimerType,
      });

      hook.rerender();
      expect(hook.result.current.timerList).toEqual([
        {
          id: expect.any(String),
          timerValue: { hours: 0, minutes: 0, seconds: 0 },
          title: "new title",
          type: "stopwatch",
        },
      ]);
    });
  });
});
