import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchPage from "./SearchPage";

//* Mocked
import searchCharactersAction from "@/heroes/actions/searchCharactersAction";

vi.mock("@/heroes/actions/searchCharactersAction");
const searchCharactersActionMock = vi.mocked(searchCharactersAction);

vi.mock("@/components/custom/CustomJumbotron", () => ({
  default: () => <div data-testid="custom-jumbotron" />,
}));

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
});
