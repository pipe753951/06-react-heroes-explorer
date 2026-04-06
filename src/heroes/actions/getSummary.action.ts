import heroApi from "../api/hero.api";
import type { SummaryInformationResponse } from "../types/summaryInformation.response";

export const getSummary = async function () {
  const { data } = await heroApi.get<SummaryInformationResponse>("/summary");

  return data;
};
