import { describe, expect, test, vi } from "vitest";
import getCharacter from "./getCharacter.action";
import { HERO_UNIVERSE_API_BASE_URL } from "../api/heroUniverse.api";

describe("getCharacter action", () => {
  test("should fetch a character data and return a character with the full image URL.", async () => {
    const character = await getCharacter("peter-parker");

    const expectedCharacterImageURL = `${HERO_UNIVERSE_API_BASE_URL}/images/${character.id}.jpeg`;
    expect(character.image).toBe(expectedCharacterImageURL);
  });

  test("should throw an error when character isn't found.", async () => {
    const getCharacterCallback = async () => {
      await getCharacter("unknown");
    };

    await expect(getCharacterCallback).toThrow();
  });
});
