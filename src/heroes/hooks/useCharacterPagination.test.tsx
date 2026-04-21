import type { PropsWithChildren } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import type { CharactersResponse } from "../types/getCharacters.response";

import getCharactersByPage from "../actions/getCharactersByPage.action";
import useCharacterPagination from "./useCharacterPagination";

vi.mock("../actions/getCharactersByPage.action", () => ({
  default: vi.fn(),
}));

const getCharactersByPageMock = vi.mocked(getCharactersByPage);

const testingQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const reactQueryTestingProvider = function () {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={testingQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useCharacterPagination", () => {
  const mockCharactersData = {
    total: 20,
    pages: 4,
    heroes: [],
  } as CharactersResponse;

  afterEach(() => {
    vi.clearAllMocks();
    testingQueryClient.clear();
  });

  test("must have initial state ({ isLoading: true }).", () => {
    getCharactersByPageMock.mockResolvedValue(mockCharactersData);

    const { result } = renderHook(() => useCharacterPagination(1, 6), {
      wrapper: reactQueryTestingProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("must get paginated characters with React Query success state.", async () => {
    getCharactersByPageMock.mockResolvedValue(mockCharactersData);

    const { result } = renderHook(() => useCharacterPagination(1, 6), {
      wrapper: reactQueryTestingProvider(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.status).toBe("success");
    expect(getCharactersByPageMock).toHaveBeenLastCalledWith(1, 6, "all");
  });

  test("must get paginated characters depending on given parameters.", async () => {
    getCharactersByPageMock.mockResolvedValue(mockCharactersData);

    const { result } = renderHook(() => useCharacterPagination(1, 6, "hero"), {
      wrapper: reactQueryTestingProvider(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.status).toBe("success");
    expect(getCharactersByPageMock).toHaveBeenLastCalledWith(1, 6, "hero");
  });
});
