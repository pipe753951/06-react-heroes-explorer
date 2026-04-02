import { Users, Heart, Zap, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import HeroStatisticCard from "./HeroStatisticCard";

const HeroStatistics = function () {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatisticCard
        title="Total de personajes"
        icon={<Users className="size-5 text-muted-foreground" />}
      >
        <div className="text-3xl font-bold">16</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            12 Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            2 Villains
          </Badge>
        </div>
      </HeroStatisticCard>

      <HeroStatisticCard
        title="Favoritos"
        icon={<Heart className="size-5 text-muted-foreground" />}
      >
        <div className="text-3xl font-bold text-red-600">3</div>
        <p className="text-muted-foreground">18.8% of total</p>
      </HeroStatisticCard>

      <HeroStatisticCard
        title="El más fuerte"
        icon={<Zap className="size-5 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">Superman</div>
        <p className="text-xs text-muted-foreground">Fuerza: 10/10</p>
      </HeroStatisticCard>

      <HeroStatisticCard
        title="El más inteligente"
        icon={<Trophy className="size-5 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">Iron Man</div>
        <p className="text-xs text-muted-foreground">Inteligencia: 10/10</p>
      </HeroStatisticCard>

      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorites</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">3</div>
          <p className="text-xs text-muted-foreground">18.8% of total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Strongest</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Superman</div>
          <p className="text-xs text-muted-foreground">Strength: 10/10</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Smartest</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Iron Man</div>
          <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default HeroStatistics;
