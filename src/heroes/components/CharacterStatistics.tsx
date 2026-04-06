import { Users, Heart, Zap, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import CharacterStatisticCard from "./CharacterStatisticCard";

const CharacterStatistics = function () {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <CharacterStatisticCard
        title="Total de personajes"
        icon={<Users className="text-muted-foreground size-5" />}
      >
        <div className="text-3xl font-bold">16</div>
        <div className="mt-2 flex gap-1">
          <Badge variant="secondary" className="text-xs">
            12 Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            2 Villains
          </Badge>
        </div>
      </CharacterStatisticCard>

      <CharacterStatisticCard
        title="Favoritos"
        icon={<Heart className="text-muted-foreground size-5" />}
      >
        <div className="text-3xl font-bold text-red-600">3</div>
        <p className="text-muted-foreground">18.8% of total</p>
      </CharacterStatisticCard>

      <CharacterStatisticCard
        title="El más fuerte"
        icon={<Zap className="text-muted-foreground size-5" />}
      >
        <div className="text-2xl font-bold">Superman</div>
        <p className="text-muted-foreground text-xs">Fuerza: 10/10</p>
      </CharacterStatisticCard>

      <CharacterStatisticCard
        title="El más inteligente"
        icon={<Trophy className="text-muted-foreground size-5" />}
      >
        <div className="text-2xl font-bold">Iron Man</div>
        <p className="text-muted-foreground text-xs">Inteligencia: 10/10</p>
      </CharacterStatisticCard>
    </div>
  );
};

export default CharacterStatistics;
