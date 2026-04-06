import heroApi, { HERO_API_BASE_URL } from "../api/hero.api";

import type { HeroesResponse } from "../types/getHeroes.response";
import type { ValidCharacterCategoryToQuery } from "../types/validCharacterCategoryQuery.type";

const getHeroesByPage = async (
  page: number,
  limit: number = 6,
  category: ValidCharacterCategoryToQuery,
): Promise<HeroesResponse> => {
  console.log(page);

  const { data } = await heroApi.get<HeroesResponse>("/", {
    params: {
      category,
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
