import { Users, Heart, Zap, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import useCharacterSummary from "../hooks/useCharacterSummary";

import CharacterStatisticCard from "./CharacterStatisticCard";
import { use } from "react";
import { FavoriteCharacterContext } from "../context/FavoriteCharacterContext";

const CharacterStatistics = function () {
  const { data: summary } = useCharacterSummary();
  const { favoriteCharactersCount } = use(FavoriteCharacterContext);

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <CharacterStatisticCard
        title="Total de personajes"
        icon={<Users className="text-muted-foreground size-5" />}
      >
        <div className="text-3xl font-bold">{summary?.totalCharacters}</div>
        <div className="mt-2 flex gap-1">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villains
          </Badge>
        </div>
      </CharacterStatisticCard>

      <CharacterStatisticCard
        title="Favoritos"
        icon={<Heart className="text-muted-foreground size-5" />}
      >
        {/* TODO: obtener y calcular porcentaje favoritos contra total de personajes. */}
        <div className="text-3xl font-bold text-red-600">
          {favoriteCharactersCount}
        </div>
        {summary?.totalCharacters ? (
          <p className="text-muted-foreground">
            {(favoriteCharactersCount * 100) / summary.totalCharacters}% of
            total
          </p>
        ) : (
          <p>Cargando...</p>
        )}
      </CharacterStatisticCard>

      <CharacterStatisticCard
        title="El más fuerte"
        icon={<Zap className="text-muted-foreground size-5" />}
      >
        <div className="text-2xl font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-muted-foreground text-xs">
          Fuerza: {summary?.strongestHero.strength}/10
        </p>
      </CharacterStatisticCard>

      <CharacterStatisticCard
        title="El más inteligente"
        icon={<Trophy className="text-muted-foreground size-5" />}
      >
        <div className="text-2xl font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-muted-foreground text-xs">
          Inteligencia: {summary?.smartestHero.intelligence}/10
        </p>
      </CharacterStatisticCard>
    </div>
  );
};

export default CharacterStatistics;
