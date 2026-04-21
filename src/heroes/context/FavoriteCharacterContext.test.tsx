import { use } from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import FavoriteCharacterProvider, {
  FavoriteCharacterContext,
} from "./FavoriteCharacterContext";

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
});
