import { describe, expect, test } from "vitest";
import getCharacter from "./getCharacter.action";
import { HERO_UNIVERSE_API_BASE_URL } from "../api/heroUniverse.api";

describe("getCharacter action", () => {
  test("should fetch a character data and return a character with the full image URL.", async () => {
    const character = await getCharacter("peter-parker");

    const expectedCharacterImageURL = `${HERO_UNIVERSE_API_BASE_URL}/images/${character.id}.jpeg`;
    expect(character.image).toBe(expectedCharacterImageURL);
  });

  test("should throw an error when character isn't found.", async () => {
    //* Forma aplicada por el instructor.
    // await getCharacter("unknown").catch((error) => {
    //   expect(error).toBeDefined();
    //   expect(error.message).toBe("Request failed with status code 404");
    // });

    //* Verificación de error en función asíncrona de manera directa.
    await expect(getCharacter("unknown")).rejects.toThrow(
      "Request failed with status code 404",
    );
  });

  describe("Custom tests.", () => {
    test("should fetch a character data and return a character that matches its snapshot.", async () => {
      const character = await getCharacter("peter-parker");

      expect(character).toMatchSnapshot();
    });
  });
});
