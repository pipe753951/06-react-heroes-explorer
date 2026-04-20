import type { PropsWithChildren } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

import {
  QueryClient,
  QueryClientProvider,
  type UseQueryResult,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import AxiosMockAdapter from "axios-mock-adapter";

import heroUniverseApi from "../api/heroUniverse.api";

import useCharacterSummary from "./useCharacterSummary";
import getSummary from "../actions/getSummary.action";
import type { SummaryInformation } from "../types/summaryInformation";

vi.mock("../actions/getSummary.action", () => ({
  default: vi.fn(),
}));

const getSummaryActionMock = vi.mocked(getSummary);

const reactQueryTestingProvider = function () {
  const testingQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={testingQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useCharacterSummary", () => {
  const heroUniverseApiMock = new AxiosMockAdapter(heroUniverseApi);
  afterEach(() => {
    heroUniverseApiMock.reset();
  });

  test("must return initial state (isLoading).", async () => {
    const summaryDataMock = {
      totalCharacters: 10,
      strongestHero: {
        id: "1",
        name: "clark-kent",
      },
      smartestHero: {
        id: "1",
        name: "clark-kent",
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformation;

    getSummaryActionMock.mockResolvedValue(summaryDataMock);

    const { result } = renderHook(useCharacterSummary, {
      wrapper: reactQueryTestingProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test.skip("must return data in React Query useQuery when API call was successful.", async () => {
    heroUniverseApiMock.onGet("/summary").passThrough();

    const { result } = renderHook(useCharacterSummary, {
      wrapper: reactQueryTestingProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeInstanceOf(Object);
    expect(result.current.data).toMatchSnapshot();
  });

  test("must return data in React Query useQuery when mock API call was successful.", async () => {
    const summaryDataMock = {
      totalCharacters: 10,
      strongestHero: {
        id: "1",
        name: "clark-kent",
      },
      smartestHero: {
        id: "1",
        name: "clark-kent",
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformation;

    getSummaryActionMock.mockResolvedValue(summaryDataMock);

    const { result } = renderHook(useCharacterSummary, {
      wrapper: reactQueryTestingProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      console.log(result.current);
    });

    expect(result.current).toMatchObject({
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: expect.any(Object),
    } as UseQueryResult<SummaryInformation, Error>);

    expect(result.current.data).toMatchSnapshot();
  });
});
