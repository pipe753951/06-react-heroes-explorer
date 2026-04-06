import type { Character } from "../types/character.response";
import CharacterGridCard from "./CharacterGridCard";

interface Props {
  characters: Character[];
}

const CharacterGrid = function ({ characters }: Props) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <CharacterGridCard
          key={character.id}
          active={character.status === "Active"}
          alias={character.alias}
          characterCategory={character.category}
          universe={character.universe}
          createdAtYear={character.firstAppearance}
          description={character.description}
          durability={character.durability}
          favorite
          imageURL={character.image}
          intelligence={character.intelligence}
          name={character.name}
          powers={character.powers}
          slug={character.slug}
          speed={character.speed}
          strength={character.speed}
          team={character.team}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
