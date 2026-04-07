import { createContext, useState, type PropsWithChildren } from "react";
import type { Character } from "../types/character.response";

interface FavoriteCharacterContextValue {
  favorites: Character[];
  favoriteCount: number;

  checkFavoriteCharacter(character: Character): boolean;
  toggleFavorite(character: Character): void;
}

const FavoriteCharacterContext = createContext(
  {} as FavoriteCharacterContextValue,
);

const FavoriteCharacterProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  const toggleFavorite = (character: Character) => {
    const characterExists = favorites.find(
      (findingCharacter) => findingCharacter.id == character.id,
    );

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
    favorites: [],
    favoriteCount: 0,

    checkFavoriteCharacter() {
      return false;
    },
    toggleFavorite,
  };

  return (
    <FavoriteCharacterContext value={defaultValue}>
      {children}
    </FavoriteCharacterContext>
  );
};

export default FavoriteCharacterProvider;
