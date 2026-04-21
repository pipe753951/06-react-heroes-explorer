import { use } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import type { Character } from "../types/character.response";

import FavoriteCharacterProvider, {
  FavoriteCharacterContext,
} from "./FavoriteCharacterContext";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

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
  afterEach(() => {
    vi.clearAllMocks();
  });

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

    const favoriteCharactersCountElement = screen.getByTestId(
      "favorite-characters-count",
    );

    const isMockCharacterFavoriteElement = screen.getByTestId(
      "is-mock-character-favorite",
    );

    const favoriteCharacterToEvaluateElement = screen.getByTestId(
      `character-${mockCharacter.id}`,
    );

    expect(favoriteCharactersCountElement.textContent).toBe("1");
    expect(isMockCharacterFavoriteElement.textContent).toBe("true");
    expect(favoriteCharacterToEvaluateElement.textContent).toBe("Peter Parker");

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      "favorites",
      JSON.stringify([{ id: "1", name: "Peter Parker" }]),
    );
  });

  test("must remove a character from the favorites list when toggleFavorite is called for that character.", () => {
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify([mockCharacter]),
    );

    renderContextTest();

    const toggleFavoriteCharacterBtn = screen.getByTestId(
      "toggle-favorite-character-btn",
    );

    localStorageMock.getItem.mockReturnValue("[]");

    fireEvent.click(toggleFavoriteCharacterBtn);

    const favoriteCharactersCountElement = screen.getByTestId(
      "favorite-characters-count",
    );

    const isMockCharacterFavoriteElement = screen.getByTestId(
      "is-mock-character-favorite",
    );

    const favoriteCharacterToEvaluateElement = screen.queryByTestId(
      `character-${mockCharacter.id}`,
    );

    expect(favoriteCharactersCountElement.textContent).toBe("0");
    expect(isMockCharacterFavoriteElement.textContent).toBe("false");
    expect(favoriteCharacterToEvaluateElement).toBe(null);

    expect(JSON.parse(localStorage.getItem("favorites") ?? "")).toStrictEqual(
      [],
    );

    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      "favorites",
      "[]",
    );
  });
});
