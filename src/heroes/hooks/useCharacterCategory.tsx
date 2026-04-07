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
  const validatedCategory: ValidCharacterCategoryToQuery = useMemo(() => {
    return characterCategoriesToQuery[category];
  }, [category]);

  return validatedCategory;
};

export default useCharacterCategory;
