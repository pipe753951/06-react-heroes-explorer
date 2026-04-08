import { queryOptions, useQuery } from "@tanstack/react-query";
import type { SearchCharactersQueryOptions } from "../actions/searchCharactersAction";
import searchCharactersAction from "../actions/searchCharactersAction";

const useCharacterSearch = (options: SearchCharactersQueryOptions) => {
  return useQuery(
    queryOptions({
      queryKey: ["character-search-info", { options }],
      queryFn: () => searchCharactersAction(options),
      staleTime: 300000, // 1000ms * 60s * 5m
    }),
  );
};

export default useCharacterSearch;
