import heroUniverseApi, { HERO_API_BASE_URL } from "../api/heroUniverse.api";
import type { Character as Character } from "../types/character.response";

const getCharacter = async (idOrSlug: string): Promise<Character> => {
  const { data: character } = await heroUniverseApi.get<Character>(
    "/" + idOrSlug,
  );

  return {
    ...character,
    image: `${HERO_API_BASE_URL}/images/${character.image}`,
  };
};

export default getCharacter;
