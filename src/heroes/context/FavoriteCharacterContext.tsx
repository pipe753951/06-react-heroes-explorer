import {
  createContext,
  useState,
  type JSX,
  type PropsWithChildren,
} from "react";
import type { Character } from "../types/character.response";

interface FavoriteCharacterContextValue {
  favoriteCharacters: Character[];
  favoriteCharactersCount: number;

  checkFavoriteCharacter(character: Character): boolean;
  toggleFavoriteCharacter(character: Character): void;
}

const getFavoritesArrayFromLocalStorage = function (): Character[] {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteCharacterContext = createContext(
  {} as FavoriteCharacterContextValue,
);

const FavoriteCharacterProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [favorites, setFavorites] = useState<Character[]>(
    getFavoritesArrayFromLocalStorage(),
  );

  const checkFavoriteCharacter = (character: Character): boolean =>
    favorites.some((findingCharacter) => findingCharacter.id == character.id);

  const toggleFavoriteCharacter = (character: Character): void => {
    const characterExists = checkFavoriteCharacter(character);

    if (characterExists) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (findingCharacter) => findingCharacter.id !== character.id,
        ),
      );
    }

    setFavorites((prevFavorites) => [...prevFavorites, character]);
  };

  const defaultValue: FavoriteCharacterContextValue = {
    favoriteCharacters: favorites,
    favoriteCharactersCount: favorites.length,

    checkFavoriteCharacter,
    toggleFavoriteCharacter,
  };

  return (
    <FavoriteCharacterContext value={defaultValue}>
      {children}
    </FavoriteCharacterContext>
  );
};

export default FavoriteCharacterProvider;
