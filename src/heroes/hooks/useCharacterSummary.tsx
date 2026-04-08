import { queryOptions, useQuery } from "@tanstack/react-query";
import getSummary from "../actions/getSummary.action";

const useCharacterSummary = () =>
  useQuery(
    queryOptions({
      queryKey: ["summary-information"],
      queryFn: getSummary,
      staleTime: 300000, // 1000ms * 60s * 5m
    }),
  );

export default useCharacterSummary;
