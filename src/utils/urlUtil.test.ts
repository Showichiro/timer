import { getTimerFromUrl } from "./urlUtil";

describe("getTimerFromUrl", () => {
  const original = window.location;
  afterEach(() => {
    window.location = original;
  });

  const url = "https://example.com";

  it("should return the timer value from the url (1)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/1`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 0 });
  });

  it("should return the timer value from the url (01)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/01`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 0 });
  });

  it("should return the timer value from the url (1:12)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/1:12`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (01:12)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/01:12`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 0, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (01:12)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/02:01:12`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 2, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (01:12)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/02:1:12`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual({ hours: 2, minutes: 1, seconds: 12 });
  });

  it("should return the timer value from the url (none)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual(null);
  });

  it("should return the timer value from the url (invalid value)", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: `${url}/abc`,
      },
      writable: true, // possibility to override
    });
    const timer = getTimerFromUrl();
    expect(timer).toStrictEqual(null);
  });
});
