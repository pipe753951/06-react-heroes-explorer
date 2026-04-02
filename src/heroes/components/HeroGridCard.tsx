import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type CharacterType = "hero";
type Company = "dc" | "marvel";
type Team = "justiceLeague" | "avengers";

interface Props {
  active: boolean;
  author: string;
  characterType: CharacterType;
  company: Company;
  createdAtYear: number;
  description: string;
  durability: number;
  favorite: boolean;
  intelligence: number;
  name: string;
  powers: string[];
  speed: number;
  strength: number;
  team: Team;
}

const characterTypeClassNames: Record<CharacterType, string> = {
  hero: "bg-green-100 text-green-800 border-green-200",
};

const companyBadgeClassNames: Record<Company, string> = {
  dc: "bg-blue-600",
  marvel: "bg-red-600",
};

const companyNames: Record<Company, string> = {
  dc: "DC",
  marvel: "Marvel",
};

const teamNames: Record<Team, string> = {
  justiceLeague: "Justice League",
  avengers: "Avegers",
};

const HeroGridCard = function (props: Props) {
  const {
    active,
    author,
    characterType,
    company,
    createdAtYear,
    description,
    durability,
    favorite,
    intelligence,
    name,
    powers,
    speed,
    strength,
    team,
  } = props;

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
      <div className="relative h-64 overflow-hidden">
        <img
          src="/placeholder.svg?height=300&width=300"
          alt="Superman"
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Status indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <Badge
            variant="secondary"
            className="text-xs bg-white/90 text-gray-700"
          >
            {active ? "Activo" : "Inactivo"}
          </Badge>
        </div>

        {/* Universe badge */}
        <Badge
          className={`absolute top-3 right-3 text-xs text-white ${companyBadgeClassNames[company]}`}
        >
          {companyNames[company]}
        </Badge>

        {/* Favorite button */}
        <Button
          size="sm"
          variant="text"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
        >
          <Heart
            className={`size-4 ${favorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </Button>

        {/* View details button */}
        <Button
          size="sm"
          variant="text"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight">{name}</h3>
            <p className="text-sm text-gray-600">{author}</p>
          </div>
          <Badge
            className={`text-xs ${characterTypeClassNames[characterType]}`}
          >
            {characterType}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {teamNames[team]}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium">Strength</span>
            </div>
            <Progress value={strength} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Intelligence</span>
            </div>
            <Progress value={intelligence} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <Progress value={speed} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium">Durability</span>
            </div>
            <Progress value={durability} className="h-2" />
          </div>
        </div>

        {/* Powers */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Powers:</h4>
          <div className="flex flex-wrap gap-1">
            {powers.slice(0, 2).map((power) => (
              <Badge
                key={power.toLowerCase()}
                variant="outline"
                className="text-xs"
              >
                {power}
              </Badge>
            ))}
            {powers.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-100">
                {`+${powers.length - 2} more`}
              </Badge>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">
          First appeared: {createdAtYear}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroGridCard;
