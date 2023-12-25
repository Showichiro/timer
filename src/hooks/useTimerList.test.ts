import { initializer } from "./useTimerList";

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

  describe("initializer", () => {
    it("should return initial value when localstorage does not have savedList", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      expect(initializer()).toEqual([
        {
          timerValue: undefined,
          title: "timer",
          type: "countdown",
        },
      ]);
    });

    it("should return savedList when localstorage has savedList", () => {
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
        JSON.stringify([
          {
            timerValue: {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            title: "timer1",
            type: "countdown",
          },
          {
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
          timerValue: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          title: "timer1",
          type: "countdown",
        },
        {
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
            timerValue: {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            title: "timer1",
            type: "countdown",
          },
          {
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
          timerValue: {
            hours: 5,
            minutes: 6,
            seconds: 7,
          },
          title: "タイマー",
          type: "countdown",
        },
        {
          timerValue: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          title: "timer1",
          type: "countdown",
        },
        {
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
});
