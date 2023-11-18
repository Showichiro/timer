import { getTimerFromUrl } from "./urlUtil";

describe("getTimerFromUrl", () => {
  const url = "https://example.com";

  it("should return the timer value from the url (1)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/1`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 0 });
  });

  it("should return the timer value from the url (01)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/01`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 0 });
  });

  it("should return the timer value from the url (1:12)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/1:12`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (01:12)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/01:12`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (02:01:12)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/02:01:12`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 2, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (02:1:12)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/02:1:12`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 2, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (none)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: url,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual(null);
  });

  it("should return the timer value from the url (invalid value)", () => {
    vi.spyOn(window, "location", "get").mockReturnValue({
      href: `${url}/abc`,
    } as Window["location"]);
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual(null);
  });
});
