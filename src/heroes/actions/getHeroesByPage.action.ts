import heroApi, { HERO_API_BASE_URL } from "../api/hero.api";
import type { HeroesResponse } from "../types/getHeroes.response";

const getHeroesByPage = async (): Promise<HeroesResponse> => {
  const { data } = await heroApi.get<HeroesResponse>("/");

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${HERO_API_BASE_URL}/images/${hero.image}`,
  }));

  return { ...data, heroes };
};

export default getHeroesByPage;
