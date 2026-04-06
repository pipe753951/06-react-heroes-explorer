import { useQuery, queryOptions } from "@tanstack/react-query";
import getHeroesByPage from "../actions/getHeroesByPage.action";

const useCharacterPagination = (page: number, limit: number) =>
  useQuery(
    queryOptions({
      queryKey: ["heroes", { page, limit }],
      queryFn: () => getHeroesByPage(page, limit),
      staleTime: 300000, // 1000ms * 60s * 5m
    }),
  );

export default useCharacterPagination;
