import heroApi from "../api/hero.api";
import type { SummaryInformationResponse } from "../types/summaryInformation.response";
import type { SummaryInformation } from "../types/summaryInformation";

export const getSummary = async function (): Promise<SummaryInformation> {
  const { data } = await heroApi.get<SummaryInformationResponse>("/summary");

  return {
    totalCharacters: data.totalHeroes,
    strongestHero: data.strongestHero,
    smartestHero: data.smartestHero,
    heroCount: data.heroCount,
    villainCount: data.villainCount,
  };
};
