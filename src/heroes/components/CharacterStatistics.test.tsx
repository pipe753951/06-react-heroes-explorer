import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { SummaryInformation } from "../types/summaryInformation";

import useCharacterSummary from "../hooks/useCharacterSummary";
import CharacterStatistics from "./CharacterStatistics";

vi.mock("../hooks/useCharacterSummary");
const useCharacterSummaryMock = vi.mocked(useCharacterSummary);

const mockSummaryData: SummaryInformation = {
  totalCharacters: 25,
  strongestHero: {
    id: "1",
    name: "Clark Kent",
    slug: "clark-kent",
    alias: "Superman",
    powers: [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad",
    ],
    description:
      "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: "Liga de la Justicia",
    image: "1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};

const testingQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderCharacterStatistics = function (
  mockData?: Partial<SummaryInformation>,
) {
  useCharacterSummaryMock.mockReturnValue({
    data: mockData,
  } as ReturnType<typeof useCharacterSummary>);

  return render(
    <QueryClientProvider client={testingQueryClient}>
      <CharacterStatistics />
    </QueryClientProvider>,
  );
};

describe("HeroStats", () => {
  test("must render with default state and values.", () => {
    const { container } = renderCharacterStatistics();

    screen.debug();

    expect(screen.queryByText("Cargando...")).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  test("must render with default mock summary data.", () => {
    const { container } = renderCharacterStatistics(mockSummaryData);

    expect(screen.queryByText("Total de personajes")).not.toBeNull();
    expect(screen.queryByText("Favoritos")).not.toBeNull();
    expect(screen.queryByText("El más fuerte")).not.toBeNull();
    expect(screen.queryByText("El más inteligente")).not.toBeNull();

    expect(container).toMatchSnapshot();

    screen.debug(undefined, 1000000000000000);
  });
});
