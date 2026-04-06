import { useQuery, queryOptions } from "@tanstack/react-query";

import type { ValidCharacterCategoryToQuery } from "../types/validCharacterCategoryQuery.type";
import getHeroesByPage from "../actions/getHeroesByPage.action";

const useCharacterPagination = (
  page: number,
  limit: number,
  category: ValidCharacterCategoryToQuery,
) =>
  useQuery(
    queryOptions({
      queryKey: ["heroes", { page, limit, category }],
      queryFn: () => getHeroesByPage(page, limit, category),
      staleTime: 300000, // 1000ms * 60s * 5m
    }),
  );

export default useCharacterPagination;
