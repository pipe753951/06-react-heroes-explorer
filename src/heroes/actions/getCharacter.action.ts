import heroApi, { HERO_API_BASE_URL } from "../api/hero.api";
import type { Character as Character } from "../types/character.response";

const getCharacter = async (idOrSlug: string): Promise<Character> => {
  const { data: character } = await heroApi.get<Character>("/" + idOrSlug);

  return {
    ...character,
    image: `${HERO_API_BASE_URL}/images/${character.image}`,
  };
};

export default getCharacter;
