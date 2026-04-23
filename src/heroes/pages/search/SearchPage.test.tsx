import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Character } from "@/heroes/types/character.response";

import SearchPage from "./SearchPage";

//* Mocked
import searchCharactersAction from "@/heroes/actions/searchCharactersAction";

interface CharacterGridMock {
  characters: Character[];
}

vi.mock("@/heroes/actions/searchCharactersAction");

vi.mock("@/components/custom/CustomJumbotron", () => ({
  default: () => <div data-testid="custom-jumbotron" />,
}));

vi.mock("@/heroes/components/CharacterGrid", () => ({
  default: ({ characters }: CharacterGridMock) => {
    return (
      <div data-testid="character-grid">
        {characters.map((character) => (
          <div key={character.id} data-testid={`character-${character.id}`}>
            {character.name}
          </div>
        ))}
      </div>
    );
  },
}));

const searchCharactersActionMock = vi.mocked(searchCharactersAction);

searchCharactersActionMock.mockResolvedValue([]);

const testingQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderSearchPage = function (initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={testingQueryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("SearchPage", () => {
  afterEach(() => {
    vi.clearAllMocks();

    // Clear React Query information, to make tests more efficient.
    testingQueryClient.clear();
  });

  test("must render with default query parameters, state and context values.", () => {
    const { container } = renderSearchPage();

    expect(searchCharactersActionMock).toHaveBeenCalledTimes(1);
    expect(searchCharactersActionMock).toHaveBeenLastCalledWith({
      name: undefined,
      strength: undefined,
    });

    expect(container).toMatchSnapshot();
  });

  test("must render custom jumbotron mock.", () => {
    renderSearchPage();

    const customJumbotronMockElement = screen.queryByTestId("custom-jumbotron");

    expect(customJumbotronMockElement).not.toBeNull();
  });

  test("must call search action with suitable parameters when this component is loading with name query parameter.", () => {
    const searchQuery = "spiderman";
    renderSearchPage([`/search?search_query=${searchQuery}`]);

    expect(searchCharactersActionMock).toHaveBeenCalledTimes(1);
    expect(searchCharactersActionMock).toHaveBeenLastCalledWith({
      name: searchQuery,
      strength: undefined,
    });
  });

  test("must call search action with suitable parameters when this component is loading with strength query parameter.", () => {
    const strength = "5";
    renderSearchPage([`/search?strength=${strength}`]);

    expect(searchCharactersActionMock).toHaveBeenCalledTimes(1);
    expect(searchCharactersActionMock).toHaveBeenLastCalledWith({
      name: undefined,
      strength,
    });
  });

  test("must call search action with suitable parameters when this component is loading with name strength query parameters.", () => {
    const searchQuery = "superman";
    const strength = "10";

    renderSearchPage([
      `/search?search_query=${searchQuery}&strength=${strength}`,
    ]);

    expect(searchCharactersActionMock).toHaveBeenCalledTimes(1);
    expect(searchCharactersActionMock).toHaveBeenLastCalledWith({
      name: searchQuery,
      strength,
    });
  });

  test("must render CharacterGrid with its cards when a search was done.", async () => {
    const mockCharacters = [
      { id: "1", name: "Peter Parker" },
      { id: "2", name: "Clark Kent" },
    ] as Character[];

    searchCharactersActionMock.mockResolvedValueOnce(mockCharacters);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.queryByTestId("character-grid")).not.toBeNull();
    });
  });
});
