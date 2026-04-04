import type { Hero } from "../types/hero.response";
import CharacterGridCard from "./CharacterGridCard";

interface Props {
  characters: Hero[];
}

const CharacterGrid = function ({ characters }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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
          speed={character.speed}
          strength={character.speed}
          team={character.team}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
