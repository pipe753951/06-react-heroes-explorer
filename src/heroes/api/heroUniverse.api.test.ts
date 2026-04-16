import { describe, expect, test } from "vitest";
import heroUniverseApi from "./heroUniverse.api";

describe("heroUniverseApi", () => {
  test("must be configured to use the testing server.", () => {
    const HERO_UNIVERSE_API_BASE_URL = import.meta.env["VITE_API_URL"];

    console.log(HERO_UNIVERSE_API_BASE_URL);

    expect(heroUniverseApi).toBeDefined();
    expect(heroUniverseApi.defaults.baseURL).toContain(
      HERO_UNIVERSE_API_BASE_URL,
    );
    expect(
      heroUniverseApi.defaults.baseURL?.startsWith("http://localhost:3001"),
    ).toBeTruthy();
  });
});
