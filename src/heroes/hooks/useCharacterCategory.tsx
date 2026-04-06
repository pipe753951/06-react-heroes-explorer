import { useMemo } from "react";
import type { ValidCharacterCategoryToQuery } from "../types/validCharacterCategoryQuery.type";
import type { HomeTab } from "../pages/home/HomePage";

const characterCategoriesToQuery: Record<
  HomeTab,
  ValidCharacterCategoryToQuery
> = {
  all: "all",
  favorites: "all",
  heroes: "hero",
  villains: "villain",
};

const useCharacterCategory = function (category: HomeTab) {
  console.log(category);

  const validatedCategory: ValidCharacterCategoryToQuery = useMemo(() => {
    return characterCategoriesToQuery[category];
  }, [category]);

  console.log(validatedCategory);

  return validatedCategory;
};

export default useCharacterCategory;
