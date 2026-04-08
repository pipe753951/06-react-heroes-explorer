import heroUniverseApi, {
  HERO_UNIVERSE_API_BASE_URL as HERO_UNIVERSE_API_BASE_URL,
} from "../api/heroUniverse.api";
import type { Character } from "../types/character.response";

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

const searchCharactersAction = async function (
  options: Options,
): Promise<Character[]> {
  const { data: responseData } = await heroUniverseApi.get<Character[]>(
    "/search",
    {
      params: { ...options },
    },
  );

  const characters = responseData.map((character) => ({
    ...character,
    image: `${HERO_UNIVERSE_API_BASE_URL}/images/${character.image}`,
  }));

  return characters;
};

export default searchCharactersAction;
