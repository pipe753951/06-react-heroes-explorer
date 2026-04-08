import heroUniverseApi from "../api/heroUniverse.api";
import type { SummaryInformationResponse } from "../types/summaryInformation.response";
import type { SummaryInformation } from "../types/summaryInformation";

const getSummary = async function (): Promise<SummaryInformation> {
  const { data } =
    await heroUniverseApi.get<SummaryInformationResponse>("/summary");

  return {
    totalCharacters: data.totalHeroes,
    strongestHero: data.strongestHero,
    smartestHero: data.smartestHero,
    heroCount: data.heroCount,
    villainCount: data.villainCount,
  };
};

export default getSummary;
