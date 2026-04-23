import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Character } from "@/heroes/types/character.response";

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
      <QueryClientProvider client={testingQueryClient}>
        <HomePage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  test("must render HomePage with default query parameters, state and context values", () => {
    const { container } = renderHomePage();

    expect(container).toMatchSnapshot();
  });
});
