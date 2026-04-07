import type { Character } from "../types/character.response";
import CharacterGridCard from "./CharacterGridCard";

interface Props {
  characters: Character[];
}

const CharacterGrid = function ({ characters }: Props) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <CharacterGridCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterGrid;
