import { convertTimerValueToTimeStamp } from "./convertTimerValueToTimeStamp";

describe("convertTimerValueToTimeStamp", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("convert timer value to timestamp", () => {
    const hours = 1;
    const minutes = 2;
    const seconds = 3;
    const date = new Date(1);
    vi.setSystemTime(date);
    expect(convertTimerValueToTimeStamp({ hours, minutes, seconds })).toEqual(
      new Date(3600 * 1 * 1000 + 60 * 2 * 1000 + 3 * 1000 + 1),
    );
  });
});
