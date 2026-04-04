import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type {
  CharacterCategory,
  CharacterTeam,
  CharacterUniverse,
} from "../types/hero.response";

interface Props {
  active: boolean;
  name: string;
  characterCategory: CharacterCategory;
  universe: CharacterUniverse;
  createdAtYear: string;
  description: string;
  durability: number;
  favorite: boolean;
  imageURL: string;
  intelligence: number;
  alias: string;
  powers: string[];
  speed: number;
  strength: number;
  team: CharacterTeam;
}

const characterCategoryClassNames: Record<CharacterCategory, string> = {
  Hero: "bg-green-100 text-green-800 border-green-200",
};

const characterCategoryNames: Record<CharacterCategory, string> = {
  Hero: "Héroe",
};

const universeBadgeClassNames: Record<CharacterUniverse, string> = {
  DC: "bg-blue-600",
  Marvel: "bg-red-600",
};

const CharacterGridCard = function (props: Props) {
  const {
    active,
    name,
    characterCategory,
    universe,
    createdAtYear,
    description,
    durability,
    favorite,
    imageURL,
    intelligence,
    alias,
    powers,
    speed,
    strength,
    team,
  } = props;

  return (
    <section>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageURL}
            alt={alias}
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
            className={`absolute top-3 right-3 text-xs text-white ${universeBadgeClassNames[universe]}`}
          >
            {universe}
          </Badge>
          {/* Favorite button */}
          <Button
            size="sm"
            variant="text"
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
            aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
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
            aria-label={`Ver detalles de ${alias}`}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="font-bold text-lg leading-tight">{alias}</h2>
              <p className="text-sm text-gray-600">{name}</p>
            </div>
            <Badge
              className={`text-xs ${characterCategoryClassNames[characterCategory]}`}
            >
              {characterCategoryNames[characterCategory]}
            </Badge>
          </div>
          <Badge variant="outline" className="w-fit text-xs">
            {team}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-orange-500" />
                <span className="text-xs font-medium">Fuerza</span>
              </div>
              <Progress
                value={strength * 10}
                indicatorClassName="bg-orange-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium">Inteligencia</span>
              </div>
              <Progress
                value={intelligence * 10}
                indicatorClassName="bg-blue-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Gauge className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium">Velocidad</span>
              </div>
              <Progress value={speed * 10} indicatorClassName="bg-green-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-gray-500" />
                <span className="text-xs font-medium">Resistencia</span>
              </div>
              <Progress
                value={durability * 10}
                indicatorClassName="bg-gray-500"
              />
            </div>
          </div>
          {/* Powers */}
          <div className="space-y-2">
            <h2 className="font-medium text-sm">Poderes:</h2>
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
    </section>
  );
};

export default CharacterGridCard;
