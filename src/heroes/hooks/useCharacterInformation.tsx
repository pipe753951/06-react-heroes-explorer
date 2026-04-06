import { queryOptions, useQuery } from "@tanstack/react-query";
import getCharacter from "../actions/getCharacter.action";

const useCharacterInformation = (idOrSlug: string) =>
  useQuery(
    queryOptions({
      queryKey: ["character-information", { idOrSlug }],
      queryFn: () => getCharacter(idOrSlug),
      staleTime: 300000, // 1000ms * 60s * 5m
      retry: false,
    }),
  );

export default useCharacterInformation;
