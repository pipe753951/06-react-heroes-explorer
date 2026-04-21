import { use } from "react";
import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import type { Character } from "../types/character.response";

import FavoriteCharacterProvider, {
  FavoriteCharacterContext,
} from "./FavoriteCharacterContext";

const mockCharacter = {
  id: "1",
  name: "Peter Parker",
} as Character;

const TestComponent = function () {
  const {
    favoriteCharacters,
    favoriteCharactersCount,
    checkFavoriteCharacter,
    toggleFavoriteCharacter,
  } = use(FavoriteCharacterContext);

  return (
    <>
      <div data-testid="favorite-characters-count">
        {favoriteCharactersCount}
      </div>
      <div data-testid="favorite-characters-list">
        {favoriteCharacters.map((character) => (
          <div key={character.id} data-testid={`character-${character.id}`}>
            {character.name}
          </div>
        ))}
      </div>

      <button
        data-testid="toggle-favorite-character-btn"
        onClick={() => toggleFavoriteCharacter(mockCharacter)}
      >
        Toggle favorite
      </button>

      <div data-testid="is-mock-character-favorite">
        {checkFavoriteCharacter(mockCharacter).toString()}
      </div>
    </>
  );
};

const renderContextTest = function () {
  return render(
    <FavoriteCharacterProvider>
      <TestComponent />
    </FavoriteCharacterProvider>,
  );
};

describe("FavoriteCharacterContext", () => {
  test("must initialize with default value.", () => {
    renderContextTest();

    expect(screen.getByTestId("favorite-characters-count").textContent).toBe(
      "0",
    );
    expect(screen.getByTestId("favorite-characters-list").children.length).toBe(
      0,
    );
  });

  test("must add character to the favorites list when toggleFavorite is called for that character.", () => {
    renderContextTest();
    const toggleFavoriteCharacterBtn = screen.getByTestId(
      "toggle-favorite-character-btn",
    );

    fireEvent.click(toggleFavoriteCharacterBtn);

    const isMockCharacterFavoriteElement = screen.getByTestId(
      "is-mock-character-favorite",
    );

    const favoriteCharacterToEvaluate = screen.getByTestId(
      `character-${mockCharacter.id}`,
    );

    expect(isMockCharacterFavoriteElement.textContent).toBe("true");
    expect(favoriteCharacterToEvaluate.textContent).toBe("Peter Parker");

    expect(JSON.parse(localStorage.getItem("favorites") ?? "")).toStrictEqual([
      { id: "1", name: "Peter Parker" },
    ]);

    screen.debug();
  });
});
