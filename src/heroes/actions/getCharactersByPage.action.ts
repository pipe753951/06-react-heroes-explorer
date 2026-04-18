import heroUniverseApi, {
  HERO_UNIVERSE_API_BASE_URL,
} from "../api/heroUniverse.api";

import type { CharactersResponse } from "../types/getCharacters.response";
import type { ValidCharacterCategoryToQuery } from "../types/validCharacterCategoryQuery.type";

const getCharactersByPage = async (
  page: number,
  limit: number = 6,
  category: ValidCharacterCategoryToQuery = "all",
): Promise<CharactersResponse> => {
  const { data } = await heroUniverseApi.get<CharactersResponse>("/", {
    params: {
      category,
      limit,
      offset: (page - 1) * limit,
    },
  });

  const characters = data.heroes.map((character) => ({
    ...character,
    image: `${HERO_UNIVERSE_API_BASE_URL}/images/${character.image}`,
  }));

  return { ...data, heroes: characters };
};

export default getCharactersByPage;
