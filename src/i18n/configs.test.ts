import { getSupportedLanguage } from "./configs";

describe("getSupportedLanguage", () => {
  it.each([
    ["ja", "ja"],
    ["ja-JP", "ja"],
    ["en", "en"],
    ["en-US", "en"],
    ["JA-jp", "ja"],
    ["fr-FR", "en"],
  ])("maps %s to %s", (browserLanguage, expectedLanguage) => {
    expect(getSupportedLanguage(browserLanguage)).toBe(expectedLanguage);
  });
});
