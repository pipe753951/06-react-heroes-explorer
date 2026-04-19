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
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 2) page = 6;

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
