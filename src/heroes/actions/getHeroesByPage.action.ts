import heroApi, { HERO_API_BASE_URL } from "../api/hero.api";
import type { HeroesResponse } from "../types/getHeroes.response";

const getHeroesByPage = async (
  page: number,
  limit: number = 6,
): Promise<HeroesResponse> => {
  console.log(page);

  const { data } = await heroApi.get<HeroesResponse>("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${HERO_API_BASE_URL}/images/${hero.image}`,
  }));

  return { ...data, heroes };
};

export default getHeroesByPage;
