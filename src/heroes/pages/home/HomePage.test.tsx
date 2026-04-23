import { afterEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Character } from "@/heroes/types/character.response";

import FavoriteCharacterProvider from "@/heroes/context/FavoriteCharacterContext";
import HomePage from "./HomePage";

//* Mocked
import useCharacterPagination from "@/heroes/hooks/useCharacterPagination";

vi.mock("@/heroes/hooks/useCharacterPagination");

const testingQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const useCharacterPaginationMock = vi.mocked(useCharacterPagination);

useCharacterPaginationMock.mockReturnValue({
  data: { total: 0, heroes: [] as Character[], pages: 0 },
  isLoading: false,
  isError: false,
  isSuccess: true,
} as ReturnType<typeof useCharacterPagination>);

const renderHomePage = function (initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteCharacterProvider>
        <QueryClientProvider client={testingQueryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteCharacterProvider>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("must render HomePage with default query parameters, state and context values", () => {
    const { container } = renderHomePage();

    expect(container).toMatchSnapshot();
  });

  test("must render HomePage with default pagination query parameters and state.", () => {
    renderHomePage();

    expect(useCharacterPaginationMock).toHaveBeenCalled();
    expect(useCharacterPaginationMock).toHaveBeenLastCalledWith(1, 6, "all");
  });

  test("must render HomePage with custom pagination query parameters and state.", () => {
    renderHomePage(["/?page=2&limit=10&tab=villains"]);

    expect(useCharacterPaginationMock).toHaveBeenCalled();
    expect(useCharacterPaginationMock).toHaveBeenLastCalledWith(
      2,
      10,
      "villain",
    );
  });

  test("must call useCharacterPagination with expected page but same limit when a tab is clicked", () => {
    renderHomePage(["/?page=2&limit=10&tab=favorites"]);

    const [, , , villainsTab] = screen.getAllByRole("tab");

    fireEvent.click(villainsTab);

    expect(useCharacterPaginationMock).toHaveBeenLastCalledWith(
      1,
      10,
      "villain",
    );
  });
});
