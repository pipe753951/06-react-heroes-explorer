import { afterEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import heroUniverseApi, {
  HERO_UNIVERSE_API_BASE_URL,
} from "../api/heroUniverse.api";
import getCharactersByPage from "./getCharactersByPage.action";

describe("getCharactersByPage", () => {
  const heroUniverseApiMock = new AxiosMockAdapter(heroUniverseApi);

  afterEach(() => {
    heroUniverseApiMock.reset();
    heroUniverseApiMock.resetHistory();
  });

  test("must get default fake character page with expected client modifications.", async () => {
    heroUniverseApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [{ image: "1.jpeg" }, { image: "2.jpeg" }],
    });

    const response = await getCharactersByPage(1);

    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${HERO_UNIVERSE_API_BASE_URL}/images/1.jpeg` },
        { image: `${HERO_UNIVERSE_API_BASE_URL}/images/2.jpeg` },
      ],
    });
  });

  test("must get correct characters when indicated page is NaN.", async () => {
    heroUniverseApiMock.onGet("/").passThrough();

    const characterPageOne = await getCharactersByPage(NaN);

    expect(characterPageOne).toStrictEqual({
      total: 25,
      pages: 5,
      heroes: expect.any(Array),
    });

    expect(characterPageOne.heroes[0].name).toBe("Clark Kent");
  });

  test("must get correct characters when indicated page is string number.", async () => {
    heroUniverseApiMock.onGet("/").passThrough();

    const characterPageOne = await getCharactersByPage(
      "2" as unknown as number,
    );

    expect(characterPageOne).toStrictEqual({
      total: 25,
      pages: 5,
      heroes: expect.any(Array),
    });

    expect(characterPageOne.heroes[0].name).toBe("Steve Rogers");
  });

  test("must get correct characters when correct query parameters.", async () => {
    heroUniverseApiMock
      .onGet("/")
      .reply(200, { heroes: [{ image: "0.jpeg" }] });

    await getCharactersByPage(3, 4, "hero");

    const requestParams = heroUniverseApiMock.history.get[0].params;
    expect(requestParams).toStrictEqual({
      category: "hero",
      limit: 4,
      offset: 8, // 4 * (3 - 1)
    });
  });
});
