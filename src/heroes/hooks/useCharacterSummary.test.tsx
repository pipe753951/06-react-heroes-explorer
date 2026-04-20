import { afterEach, describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AxiosMockAdapter from "axios-mock-adapter";
import { renderHook } from "@testing-library/react";

import heroUniverseApi from "../api/heroUniverse.api";

import useCharacterSummary from "./useCharacterSummary";
import type { PropsWithChildren } from "react";

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
    heroUniverseApiMock.onGet("/summary").withDelayInMs(1000).reply(200);
    const { result } = renderHook(useCharacterSummary, {
      wrapper: reactQueryTestingProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
